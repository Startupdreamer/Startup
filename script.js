// 平滑滚动
document.addEventListener('DOMContentLoaded', function() {
    // 汉堡菜单交互
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止事件冒泡
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Menu toggle clicked, active:', menuToggle.classList.contains('active'));
        });
        
        // 点击导航链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.99)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }
    });

    // 资讯数据
    const newsData = [
        {
            id: 1,
            title: '当 GPT 不再新鲜，学生还能靠什么入局 AI？',
            excerpt: '探讨在大模型普及的时代，高校学生如何找到自己的 AI 发展路径，从技术、产品到应用场景。',
            category: '深度解读',
            date: '2024-01-15',
            link: '#'
        },
        {
            id: 2,
            title: 'AI 创业不是风口，是长跑',
            excerpt: '分析当前 AI 创业环境，分享成功案例与失败教训，探讨长期主义在 AI 创业中的重要性。',
            category: 'AI 周报',
            date: '2024-01-10',
            link: '#'
        },
        {
            id: 3,
            title: '为什么大多数 AI 项目死在第一个月',
            excerpt: '从学生视角分析 AI 项目失败的常见原因，提供避免陷阱的实用建议。',
            category: '学生视角',
            date: '2024-01-05',
            link: '#'
        },
        {
            id: 4,
            title: 'AI 时代的学习方式变革',
            excerpt: '探讨 AI 如何改变传统学习模式，高校学生如何利用 AI 提升学习效率和创造力。',
            category: '深度解读',
            date: '2024-01-01',
            link: '#'
        },
        {
            id: 5,
            title: '从实验室到产品：AI 落地的挑战与机遇',
            excerpt: '分享 AI 技术从学术研究到实际应用的转化过程，分析其中的挑战和机遇。',
            category: 'AI 周报',
            date: '2023-12-28',
            link: '#'
        },
        {
            id: 6,
            title: '高校 AI 社团的发展现状与未来',
            excerpt: '调研全国高校 AI 社团的发展情况，探讨如何打造更具影响力的学生 AI 社区。',
            category: '学生视角',
            date: '2023-12-25',
            link: '#'
        }
    ];
    
    // 生成资讯列表
    function generateNewsList(news) {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;
        
        newsGrid.innerHTML = news.map(item => `
            <article class="news-item" data-category="${item.category}">
                <a href="${item.link}" class="news-item-link" target="_blank"></a>
                <div class="news-item-content">
                    <h3 class="news-item-title">${item.title}</h3>
                    <p class="news-item-excerpt">${item.excerpt}</p>
                    <div class="news-item-meta">
                        <span>${item.date}</span>
                        <span>${item.category}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    // 初始化资讯列表
    generateNewsList(newsData);
    
    // 新闻分类切换
    const newsCategories = document.querySelectorAll('.news-category');
    
    newsCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有活跃状态
            newsCategories.forEach(cat => cat.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 获取当前分类
            const selectedCategory = this.getAttribute('data-category');
            
            // 筛选新闻
            const filteredNews = selectedCategory === '全部' 
                ? newsData 
                : newsData.filter(item => item.category === selectedCategory);
            
            // 重新生成资讯列表
            generateNewsList(filteredNews);
        });
    });
    
    // 为新闻项添加点击效果
    document.addEventListener('click', function(e) {
        if (e.target.closest('.news-item') && !e.target.closest('.news-item-link')) {
            const newsItem = e.target.closest('.news-item');
            const link = newsItem.querySelector('.news-item-link');
            if (link) {
                window.open(link.href, '_blank');
            }
        }
    });

    // 地区标签切换
    const regionTabs = document.querySelectorAll('.region-tab');
    const universityItems = document.querySelectorAll('.university-item');
    
    regionTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有活跃状态
            regionTabs.forEach(t => t.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 获取当前地区
            const selectedRegion = this.getAttribute('data-region');
            
            // 筛选高校
            universityItems.forEach(item => {
                const itemRegion = item.getAttribute('data-region');
                if (selectedRegion === '全部' || itemRegion === selectedRegion) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 活动数据
    const eventData = {
        1: {
            title: 'AI 线上分享会',
            qrcode: '活动二维码 - AI 线上分享会',
            contact: {
                name: '张三',
                wechat: 'ai_share_2024'
            }
        },
        2: {
            title: '学生项目 Demo Day',
            qrcode: '活动二维码 - 学生项目 Demo Day',
            contact: {
                name: '李四',
                wechat: 'demo_day_2024'
            }
        },
        3: {
            title: '创业失败复盘会',
            qrcode: '活动二维码 - 创业失败复盘会',
            contact: {
                name: '王五',
                wechat: 'failure_review'
            }
        },
        4: {
            title: '校际交流会',
            qrcode: '活动二维码 - 校际交流会',
            contact: {
                name: '赵六',
                wechat: 'university_exchange'
            }
        },
        5: {
            title: 'AI 技术 workshop',
            qrcode: '活动二维码 - AI 技术 workshop',
            contact: {
                name: '孙七',
                wechat: 'ai_workshop_2024'
            }
        },
        6: {
            title: '创业导师一对一',
            qrcode: '活动二维码 - 创业导师一对一',
            contact: {
                name: '周八',
                wechat: 'mentor_oneonone'
            }
        }
    };
    
    // 处理活动报名按钮点击
    const registerButtons = document.querySelectorAll('.event-register-btn');
    const modal = document.getElementById('eventModal');
    const closeModal = document.querySelector('.close');
    const modalEventTitle = document.getElementById('modalEventTitle');
    const modalQrcode = document.getElementById('modalQrcode');
    const modalContact = document.getElementById('modalContact');
    
    if (registerButtons.length > 0 && modal) {
        registerButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 获取活动ID
                const eventItem = this.closest('.event-item');
                const eventId = eventItem.getAttribute('data-id');
                
                // 获取活动数据
                const event = eventData[eventId];
                if (!event) return;
                
                // 更新模态框内容
                modalEventTitle.textContent = event.title;
                modalQrcode.innerHTML = `<p>${event.qrcode}</p><p style="font-size: 0.8rem; margin-top: 0.5rem;">(此处放置实际二维码)</p>`;
                modalContact.innerHTML = `
                    <div class="contact-item">
                        <span class="contact-label">姓名：</span>
                        <span class="contact-value">${event.contact.name}</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-label">微信：</span>
                        <span class="contact-value">${event.contact.wechat}</span>
                    </div>
                `;
                
                // 显示模态框
                modal.classList.add('show');
            });
        });
        
        // 关闭模态框
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.classList.remove('show');
            });
        }
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // 表单提交处理
    const joinForm = document.querySelector('.join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const member = {
                name: formData.get('name'),
                school: formData.get('school'),
                major: formData.get('major'),
                grade: formData.get('grade'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                interest: formData.get('interest'),
                about: formData.get('about'),
                timestamp: new Date().toISOString()
            };
            
            // 保存到localStorage
            const members = JSON.parse(localStorage.getItem('startupDreamersMembers')) || [];
            members.push(member);
            localStorage.setItem('startupDreamersMembers', JSON.stringify(members));
            
            alert('表单提交成功！我们会尽快与您联系。');
            this.reset();
        });
    }

    // 晕染流体效果
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.position = 'relative';
        
        // 创建晕染 canvas
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.right = '0';
        canvas.style.bottom = '0';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.6';
        heroSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // 晕染粒子类
        class SmokeParticle {
            constructor(x, y) {
                // 初始位置：左下区域
                this.x = x || Math.random() * canvas.width * 0.3;
                this.y = y || canvas.height * 0.7 + Math.random() * canvas.height * 0.3;
                // 速度：缓慢向右上流动
                this.vx = Math.random() * 0.8 + 0.2; // 0.2-1 向右
                this.vy = -(Math.random() * 0.8 + 0.2); // -1 到 -0.2 向上
                this.baseSize = Math.random() * 150 + 100; // 100-250，非常大的粒子
                this.size = this.baseSize;
                this.life = Math.random() * 3 + 2; // 更长的生命周期
                this.decay = Math.random() * 0.003 + 0.001; // 更慢的衰减
                this.color = this.getColor();
                this.pulse = Math.random() * Math.PI * 2;
                this.alpha = Math.random() * 0.3 + 0.2; // 0.2-0.5 的透明度
            }
            
            getColor() {
                const colors = [
                    { r: 255, g: 127, b: 0 },     // 主橙色 (#FF7F00)
                    { r: 255, g: 165, b: 0 },     // 橙色
                    { r: 255, g: 193, b: 7 },     // 浅橙色
                    { r: 255, g: 215, b: 0 }      // 金色
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                // 流体运动 - 更平滑的流动
                this.vx += (Math.random() - 0.5) * 0.2;
                this.vy += (Math.random() - 0.5) * 0.2;
                
                // 保持向右上的主要方向
                if (this.vx < 0.3) this.vx = 0.3;
                if (this.vy > -0.3) this.vy = -0.3;
                
                // 限制速度，保持平滑流动
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 2.5) {
                    this.vx = (this.vx / speed) * 2.5;
                    this.vy = (this.vy / speed) * 2.5;
                }
                
                this.x += this.vx;
                this.y += this.vy;
                
                // 生命周期
                this.life -= this.decay;
                
                // 脉动效果 - 更柔和的变化
                this.pulse += 0.05;
                this.size = this.baseSize * (0.9 + 0.1 * Math.sin(this.pulse));
                
                // 边界检测 - 只在离开右上区域时重新生成
                if (this.x > canvas.width + 50 || this.y < -50) {
                    // 重新生成在左下区域
                    this.x = Math.random() * canvas.width * 0.3;
                    this.y = canvas.height * 0.7 + Math.random() * canvas.height * 0.3;
                    this.life = Math.random() * 1.5 + 0.5;
                    this.decay = Math.random() * 0.005 + 0.002;
                    this.color = this.getColor();
                }
            }
            
            draw() {
                if (this.life <= 0) return;
                
                ctx.save();
                
                // 使用固定透明度，创造更稳定的光晕效果
                const alpha = this.alpha * this.life;
                
                // 创建径向渐变
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                
                // 更柔和的渐变效果
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.6})`);
                gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.3})`);
                gradient.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.1})`);
                gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
                
                // 绘制晕染效果
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }
        
        // 创建粒子数组
        const particles = [];
        const particleCount = 3; // 2-3个很大的粒子
        
        // 初始化粒子 - 全部从左下区域开始
        for (let i = 0; i < particleCount; i++) {
            particles.push(new SmokeParticle());
        }
        
        // 动画循环
        function animate() {
            // 清空画布（使用更透明的颜色，创造更柔和的拖尾效果）
            ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 应用更大的模糊滤镜，创造更柔和的光晕效果
            ctx.filter = 'blur(35px)';
            
            // 更新和绘制粒子
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                
                // 移除死亡粒子并在左下区域创建新粒子
                if (particle.life <= 0) {
                    particles[index] = new SmokeParticle();
                }
            });
            
            // 重置滤镜
            ctx.filter = 'none';
            
            requestAnimationFrame(animate);
        }
        
        // 开始动画
        animate();
        
        // 窗口大小改变时重新调整画布
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // 重新初始化粒子
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new SmokeParticle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                ));
            }
        });
    }

    // 统计数字动画
    const animateNumbers = () => {
        const counters = document.querySelectorAll('.trust-data-item h3');
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPlus = target.includes('+');
            const isText = target.includes('每周');
            
            if (isText) {
                return; // 文本内容不执行动画
            }
            
            const numericTarget = parseInt(target);
            let current = 0;
            const increment = numericTarget / 50;
            const duration = 2000;
            const startTime = Date.now();
            
            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                current = progress * numericTarget;
                
                if (isPlus) {
                    counter.textContent = Math.floor(current) + '+';
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    };
    
    // 当滚动到统计数字区域时执行动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const trustDataSection = document.querySelector('.trust-data');
    if (trustDataSection) {
        observer.observe(trustDataSection);
    }
});
