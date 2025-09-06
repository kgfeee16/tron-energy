# 多平台部署SEO优化策略

## 当前部署情况

### 主要平台
- **Vercel**: https://tron-energy-one.vercel.app/ (主域名)
- **GitHub Pages**: https://kgfeee16.github.io/tron-energy/ (备用域名)

## SEO配置更新说明

### 1. Canonical URL设置
- 主域名设为: `https://tron-energy-one.vercel.app/`
- 避免重复内容问题，告诉搜索引擎优先索引Vercel版本

### 2. Sitemap.xml优化
- 包含两个平台的所有URL
- Vercel URL设置更高优先级 (1.0)
- GitHub Pages URL设置较低优先级 (0.9)

### 3. robots.txt配置  
- 指向两个平台的sitemap
- 主要sitemap指向Vercel平台
- 备用sitemap指向GitHub Pages

### 4. 结构化数据更新
- 所有JSON-LD数据统一使用Vercel域名
- 确保搜索引擎理解主要网站地址

## 搜索引擎提交策略

### 两个平台都需要提交
由于是不同域名，需要分别向搜索引擎提交：

#### Vercel平台 (主要)
1. **Google Search Console**
   - 添加属性: `https://tron-energy-one.vercel.app`
   - 提交sitemap: `https://tron-energy-one.vercel.app/sitemap.xml`
   
2. **百度站长平台**
   - 添加网站: `https://tron-energy-one.vercel.app`
   - 提交sitemap并使用主动推送

3. **必应/其他搜索引擎**
   - 分别添加和验证Vercel域名

#### GitHub Pages平台 (备用)
1. **Google Search Console**
   - 添加属性: `https://kgfeee16.github.io`  
   - 提交sitemap: `https://kgfeee16.github.io/tron-energy/sitemap.xml`

2. **百度站长平台**
   - 添加网站: `https://kgfeee16.github.io`
   - 提交sitemap

## 优化建议

### 1. 域名重定向 (推荐)
如果可能，配置GitHub Pages重定向到Vercel：
```html
<!-- 添加到GitHub Pages的index.html head部分 -->
<script>
if (window.location.hostname === 'kgfeee16.github.io') {
    window.location.replace('https://tron-energy-one.vercel.app' + window.location.pathname);
}
</script>
```

### 2. 链接建设策略
- 对外推广统一使用Vercel域名
- 社交媒体分享使用主域名
- 外部引用统一指向主域名

### 3. 监控两个平台
- 分别监控两个域名的收录情况
- 观察搜索引擎对主域名的偏好
- 定期检查canonical标签的效果

### 4. 内容同步
- 确保两个平台内容完全同步
- 同时更新两个平台的sitemap
- 保持lastmod时间一致

## 风险与注意事项

### 潜在问题
1. **重复内容惩罚**: 两个相同内容的域名可能被视为重复
2. **权重分散**: 外链和权重可能分散到两个域名
3. **管理复杂**: 需要维护两个平台的SEO设置

### 解决方案
1. **Canonical标签**: 已设置，指向主域名
2. **优先级设置**: sitemap中已设置不同优先级
3. **统一推广**: 对外统一使用主域名推广

## 长期建议

### 选择主域名策略
建议最终选择一个主要域名：

**Vercel优势**:
- 更快的全球CDN
- 更短更好记的域名
- 更好的性能优化

**GitHub Pages优势**:
- 免费且稳定
- 与代码库集成
- 无流量限制

### 建议行动
1. 继续使用Vercel作为主域名
2. GitHub Pages作为备用和技术展示
3. 逐步将所有外部链接迁移到Vercel域名
4. 考虑购买自定义域名绑定到Vercel

## 收录效果预期

- **主域名(Vercel)**: 1-4周内被主要搜索引擎收录
- **备用域名**: 2-6周内收录，但排名可能较低
- **总体效果**: 通过多平台部署增加收录机会，但重点推广主域名