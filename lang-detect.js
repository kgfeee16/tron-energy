/**
 * Language Detection and Auto-redirect for TRON Energy Rental
 * 自动检测用户语言并跳转到对应版本
 */

(function() {
    'use strict';
    
    // 语言配置
    const LANGUAGE_CONFIG = {
        // 支持的语言及其对应的页面
        'zh': { code: 'zh-CN', page: 'index.html', name: '中文' },
        'zh-cn': { code: 'zh-CN', page: 'index.html', name: '中文' },
        'zh-hans': { code: 'zh-CN', page: 'index.html', name: '中文' },
        'en': { code: 'en', page: 'en.html', name: 'English' },
        'en-us': { code: 'en', page: 'en.html', name: 'English' },
        'en-gb': { code: 'en', page: 'en.html', name: 'English' }
    };
    
    const DEFAULT_LANGUAGE = 'zh-CN';
    const STORAGE_KEY = 'preferred_language';
    
    /**
     * 获取浏览器语言偏好
     */
    function getBrowserLanguages() {
        const languages = [];
        
        // 获取所有可能的语言设置
        if (navigator.languages) {
            languages.push(...navigator.languages);
        }
        if (navigator.language) {
            languages.push(navigator.language);
        }
        if (navigator.userLanguage) {
            languages.push(navigator.userLanguage);
        }
        if (navigator.browserLanguage) {
            languages.push(navigator.browserLanguage);
        }
        
        return languages.map(lang => lang.toLowerCase());
    }
    
    /**
     * 获取当前页面语言
     */
    function getCurrentPageLanguage() {
        const path = window.location.pathname;
        
        if (path.includes('en.html')) {
            return 'en';
        }
        return 'zh-CN';
    }
    
    /**
     * 匹配最佳语言
     */
    function matchBestLanguage(browserLanguages) {
        for (const browserLang of browserLanguages) {
            // 精确匹配
            if (LANGUAGE_CONFIG[browserLang]) {
                return LANGUAGE_CONFIG[browserLang];
            }
            
            // 匹配语言代码前缀 (如 en-US 匹配 en)
            const langPrefix = browserLang.split('-')[0];
            if (LANGUAGE_CONFIG[langPrefix]) {
                return LANGUAGE_CONFIG[langPrefix];
            }
        }
        
        return LANGUAGE_CONFIG[DEFAULT_LANGUAGE.toLowerCase()];
    }
    
    /**
     * 检查是否需要重定向
     */
    function shouldRedirect(targetLanguage, currentLanguage) {
        // 如果目标语言与当前页面语言不同，且用户没有手动选择过语言
        return targetLanguage.code !== currentLanguage && 
               !sessionStorage.getItem('manual_language_switch');
    }
    
    /**
     * 执行重定向
     */
    function redirectToLanguage(language) {
        const currentPath = window.location.pathname;
        const currentOrigin = window.location.origin;
        let newPath;
        
        // 构建新的URL路径
        if (language.page === 'index.html') {
            // 中文版本，重定向到根路径或index.html
            if (currentPath.includes('en.html')) {
                newPath = currentPath.replace('en.html', '');
            } else {
                newPath = currentPath.endsWith('/') ? currentPath : currentPath + '/';
            }
        } else {
            // 英文版本
            if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                newPath = currentPath.replace(/\/$/, '').replace('/index.html', '') + '/' + language.page;
            } else {
                newPath = currentPath + '/' + language.page;
            }
        }
        
        // 保留URL参数和hash
        const search = window.location.search;
        const hash = window.location.hash;
        const newUrl = currentOrigin + newPath + search + hash;
        
        // 设置标记，避免重定向循环
        sessionStorage.setItem('auto_redirected', 'true');
        
        // 执行重定向
        window.location.replace(newUrl);
    }
    
    /**
     * 保存用户语言偏好
     */
    function saveLanguagePreference(language) {
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch (e) {
            // 忽略存储错误
            console.log('无法保存语言偏好:', e);
        }
    }
    
    /**
     * 获取用户保存的语言偏好
     */
    function getSavedLanguagePreference() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }
    
    /**
     * 主要的语言检测逻辑
     */
    function detectAndRedirect() {
        // 检查是否已经自动重定向过（避免循环）
        if (sessionStorage.getItem('auto_redirected')) {
            sessionStorage.removeItem('auto_redirected');
            return;
        }
        
        // 检查URL参数是否指定了语言
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && LANGUAGE_CONFIG[urlLang.toLowerCase()]) {
            const targetLang = LANGUAGE_CONFIG[urlLang.toLowerCase()];
            saveLanguagePreference(targetLang.code);
            sessionStorage.setItem('manual_language_switch', 'true');
            
            if (targetLang.code !== getCurrentPageLanguage()) {
                redirectToLanguage(targetLang);
                return;
            }
        }
        
        // 检查用户保存的语言偏好
        const savedLang = getSavedLanguagePreference();
        if (savedLang && savedLang !== getCurrentPageLanguage()) {
            const savedLangConfig = Object.values(LANGUAGE_CONFIG)
                .find(config => config.code === savedLang);
            if (savedLangConfig) {
                redirectToLanguage(savedLangConfig);
                return;
            }
        }
        
        // 自动检测浏览器语言（仅在首次访问时）
        if (!getSavedLanguagePreference()) {
            const browserLanguages = getBrowserLanguages();
            const bestMatch = matchBestLanguage(browserLanguages);
            const currentLanguage = getCurrentPageLanguage();
            
            if (shouldRedirect(bestMatch, currentLanguage)) {
                saveLanguagePreference(bestMatch.code);
                redirectToLanguage(bestMatch);
            }
        }
    }
    
    /**
     * 为语言切换链接添加事件监听器
     */
    function setupLanguageSwitchers() {
        // 监听语言切换点击
        document.addEventListener('click', function(e) {
            const target = e.target;
            
            // 检查是否是语言切换链接
            if (target.tagName === 'A' && 
                (target.href.includes('en.html') || 
                 target.href.includes('index.html') || 
                 target.getAttribute('href') === '/')) {
                
                // 标记为手动切换
                sessionStorage.setItem('manual_language_switch', 'true');
                
                // 保存语言偏好
                if (target.href.includes('en.html')) {
                    saveLanguagePreference('en');
                } else {
                    saveLanguagePreference('zh-CN');
                }
            }
        });
    }
    
    /**
     * 初始化
     */
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                detectAndRedirect();
                setupLanguageSwitchers();
            });
        } else {
            detectAndRedirect();
            setupLanguageSwitchers();
        }
    }
    
    // 启动语言检测
    init();
    
    // 暴露API供外部使用
    window.TronEnergyLang = {
        switchLanguage: function(langCode) {
            const config = Object.values(LANGUAGE_CONFIG)
                .find(c => c.code === langCode);
            if (config) {
                sessionStorage.setItem('manual_language_switch', 'true');
                saveLanguagePreference(langCode);
                redirectToLanguage(config);
            }
        },
        getCurrentLanguage: getCurrentPageLanguage,
        getSupportedLanguages: function() {
            return Object.values(LANGUAGE_CONFIG);
        }
    };
    
})();