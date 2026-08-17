/**
 * Portfolio interactions
 * Tailwind CSS v4.3 + CLI
 * ------------------------------------------------------------
 * Theme • Navigation • Typing • Scroll effects • Counters
 * Reveal • Micro interactions • Project carousel
 * ------------------------------------------------------------
 */
'use strict';

const App = (() => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    /* ---------------------------------------------------------
       Theme
       --------------------------------------------------------- */
    const Theme = {
        init() {
            const saved = localStorage.getItem('theme');
            document.documentElement.classList.toggle('dark', saved !== 'light');
        },
        toggle() {
            const isDark = document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', !isDark);
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        },
        bind() {
            $('#theme-toggle-desktop')?.addEventListener('click', () => this.toggle());
            $('#theme-toggle-mobile')?.addEventListener('click', () => this.toggle());
        }
    };

    /* ---------------------------------------------------------
       Mobile navigation
       --------------------------------------------------------- */
    const MobileNav = {
        button: null,
        menu: null,
        burger: null,
        close: null,
        links: [],
        topbar: null,

        init() {
            this.button = $('#menu-btn');
            this.menu = $('#mobile-menu');
            this.burger = $('#burger-icon');
            this.close = $('#close-icon');
            this.links = $$('.mobile-nav-link');
            this.topbar = $('#mobile-topbar');
            if (!this.button || !this.menu) return;

            this.button.addEventListener('click', () => this.toggle());
            this.links.forEach(link => link.addEventListener('click', () => this.closeMenu()));

            const updateTopbar = () => {
                this.topbar?.classList.toggle('is-scrolled', window.scrollY > 12);
            };
            updateTopbar();
            window.addEventListener('scroll', updateTopbar, { passive: true });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' && this.menu.classList.contains('is-open')) this.closeMenu();
            });
        },

        toggle() {
            const open = this.menu.classList.contains('is-open');
            open ? this.closeMenu() : this.openMenu();
        },

        openMenu() {
            this.menu.classList.add('is-open');
            this.menu.setAttribute('aria-hidden', 'false');
            this.button?.setAttribute('aria-expanded', 'true');
            this.button?.setAttribute('aria-label', 'Close navigation');
            this.button?.classList.add('is-open');
            this.burger?.classList.add('hidden');
            this.close?.classList.remove('hidden');
        },

        closeMenu() {
            this.menu.classList.remove('is-open');
            this.menu.setAttribute('aria-hidden', 'true');
            this.button?.setAttribute('aria-expanded', 'false');
            this.button?.setAttribute('aria-label', 'Open navigation');
            this.button?.classList.remove('is-open');
            this.burger?.classList.remove('hidden');
            this.close?.classList.add('hidden');
        }
    };

    /* ---------------------------------------------------------
       Active navigation
       --------------------------------------------------------- */
    const ActiveNav = {
        init() {
            const sections = $$('main section[id]');
            const links = $$('.nav-link');
            const mobileLinks = $$('.mobile-nav-link');
            if (!sections.length || !links.length) return;

            const activate = id => {
                links.forEach(link => {
                    const active = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('bg-indigo-500/10', active);
                    link.classList.toggle('dark:bg-indigo-600/20', active);
                    link.classList.toggle('text-indigo-600', active);
                    link.classList.toggle('dark:text-indigo-400', active);
                    link.classList.toggle('border-indigo-500/30', active);
                });

                mobileLinks.forEach(link => {
                    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
                });
            };

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) activate(entry.target.id);
                });
            }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

            sections.forEach(section => observer.observe(section));
        }
    };

    /* ---------------------------------------------------------
       Typing effects
       --------------------------------------------------------- */
    const Typing = {
        type(element, texts, options = {}) {
            if (!element || !texts.length) return;

            const typingSpeed = options.typingSpeed ?? 100;
            const deletingSpeed = options.deletingSpeed ?? 50;
            const pause = options.pause ?? 2800;
            const gap = options.gap ?? 400;
            let textIndex = 0;
            let charIndex = 0;
            let deleting = false;

            const tick = () => {
                const text = texts[textIndex];
                charIndex += deleting ? -1 : 1;
                element.textContent = text.slice(0, charIndex);

                let delay = deleting ? deletingSpeed : typingSpeed;

                if (!deleting && charIndex === text.length) {
                    deleting = true;
                    delay = pause;
                } else if (deleting && charIndex === 0) {
                    deleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    delay = gap;
                }

                window.setTimeout(tick, delay);
            };

            tick();
        },

        typeOnce(element, text, speed = 115) {
            if (!element || !text) return;
            let index = 0;
            const tick = () => {
                index += 1;
                element.textContent = text.slice(0, index);
                if (index < text.length) window.setTimeout(tick, speed);
            };
            tick();
        },

        init() {
            const roles = ['Web Developer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer'];
            const sidebar = $('#typing-role-sidebar');
            const hero = $('#typing-role-hero');
            const mobile = $('#typing-role-mobile');
            if (!sidebar && !hero && !mobile) return;

            let index = 0;
            let chars = 0;
            let deleting = false;

            const tick = () => {
                const text = roles[index];
                chars += deleting ? -1 : 1;
                const value = text.slice(0, chars);

                [sidebar, hero, mobile].forEach(element => {
                    if (element) element.textContent = value;
                });

                let delay = deleting ? 50 : 100;
                if (!deleting && chars === text.length) {
                    deleting = true;
                    delay = 2600;
                } else if (deleting && chars === 0) {
                    deleting = false;
                    index = (index + 1) % roles.length;
                    delay = 450;
                }

                window.setTimeout(tick, delay);
            };

            tick();
        }
    };

    /* ---------------------------------------------------------
       Desktop sidebar
       --------------------------------------------------------- */
    const DesktopSidebar = {
        init() {
            const sidebar = $('#sidebar');
            if (!sidebar) return;

            // Keyboard users get the same expanded state as mouse users.
            sidebar.addEventListener('focusin', () => sidebar.classList.add('is-expanded'));
            sidebar.addEventListener('focusout', () => {
                window.setTimeout(() => {
                    if (!sidebar.contains(document.activeElement)) {
                        sidebar.classList.remove('is-expanded');
                    }
                }, 0);
            });
        }
    };

    /* ---------------------------------------------------------
       Scroll progress + back to top
       --------------------------------------------------------- */
    const ScrollUI = {
        updateProgress() {
            const bar = $('#progress-bar');
            if (!bar) return;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        },

        init() {
            $('#back-to-top')?.addEventListener('click', event => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
            this.updateProgress();
        }
    };

    /* ---------------------------------------------------------
       Clipboard
       --------------------------------------------------------- */
    const Clipboard = {
        init() {
            window.copyToClipboard = async (text, element) => {
                if (!navigator.clipboard || !element) return;
                const original = element.innerHTML;

                try {
                    await navigator.clipboard.writeText(text);
                    element.innerHTML = `
                        <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-emerald-500">Tersalin!</span>`;
                    window.setTimeout(() => element.innerHTML = original, 1800);
                } catch (error) {
                    console.error('Gagal menyalin text:', error);
                }
            };
        }
    };

    /* ---------------------------------------------------------
       Counters
       --------------------------------------------------------- */
const Counters = {
    run() {
        $$('.stat-number').forEach((counter, index) => {
            if (counter.dataset.animated === 'true') return;

            counter.dataset.animated = 'true';

            const target = Number(counter.dataset.target) || 0;
            const suffix = counter.dataset.suffix || '';
            const duration = 2200 + (index * 250);
            const start = performance.now();

            counter.style.opacity = '0';
            counter.style.transform = 'translateY(8px)';

            requestAnimationFrame(() => {
                counter.style.transition =
                    'opacity 500ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
                counter.style.opacity = '1';
                counter.style.transform = 'translateY(0)';
            });

            const frame = now => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                counter.textContent =
                    `${Math.round(target * eased)}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(frame);
                } else {
                    counter.textContent = `${target}${suffix}`;
                }
            };

            requestAnimationFrame(frame);
        });
    }
};

    /* ---------------------------------------------------------
       Reveal + staggered section animation
       --------------------------------------------------------- */
    const Reveal = {
        init() {
            const items = $$('.reveal, [data-reveal]');
            if (!items.length) return;

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                items.forEach(item => item.classList.add('is-visible'));
                Counters.run();
                return;
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const element = entry.target;
                    const children = $$('.reveal-child, [data-reveal-child]', element);

                    if (entry.isIntersecting) {
                        element.classList.add('is-visible', 'active');

                        if (element.querySelector('.stat-number')) Counters.run();

                        children.forEach((child, index) => {
                            child.style.setProperty('--reveal-delay', `${Math.min(index * 80, 480)}ms`);
                            child.classList.add('is-visible');
                        });
                    } else {
                        element.classList.remove('is-visible', 'active');
                        children.forEach(child => child.classList.remove('is-visible'));
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -50px' });

            items.forEach(item => observer.observe(item));
        }
    };

    /* ---------------------------------------------------------
       Subtle card tilt — desktop pointer only
       --------------------------------------------------------- */
    const CardMotion = {
        init() {
            if (window.matchMedia('(pointer: coarse)').matches ||
                window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            $$('.js-tilt').forEach(card => {
                card.addEventListener('pointermove', event => {
                    const rect = card.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width - 0.5;
                    const y = (event.clientY - rect.top) / rect.height - 0.5;
                    card.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
                    card.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
                    card.classList.add('is-tilting');
                });

                card.addEventListener('pointerleave', () => {
                    card.classList.remove('is-tilting');
                    card.style.removeProperty('--tilt-x');
                    card.style.removeProperty('--tilt-y');
                });
            });
        }
    };


    /* ---------------------------------------------------------
       Micro interactions
       --------------------------------------------------------- */
    const MicroInteractions = {
        init() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            $$('.js-magnetic').forEach(button => {
                button.addEventListener('pointermove', event => {
                    const rect = button.getBoundingClientRect();
                    const x = (event.clientX - rect.left - rect.width / 2) * 0.06;
                    const y = (event.clientY - rect.top - rect.height / 2) * 0.06;
                    button.style.transform = `translate(${x}px, ${y}px)`;
                });

                button.addEventListener('pointerleave', () => {
                    button.style.removeProperty('transform');
                });
            });
        }
    };

    /* ---------------------------------------------------------
       Project carousel
       --------------------------------------------------------- */
    const ProjectCarousel = {
        state: { index: 0, visible: 1, timer: null, startX: 0, deltaX: 0 },
        elements: {},
        config: { delay: 5000, swipe: 50 },

        init() {
            const carousel = $('#projects-carousel');
            const track = $('#projects-track');
            if (!carousel || !track) return;

            this.elements = {
                carousel,
                track,
                slides: $$('.project-slide', track),
                prev: $('#projects-prev'),
                next: $('#projects-next'),
                dots: $('#projects-dots'),
                counter: $('#projects-counter')
            };

            if (!this.elements.slides.length) return;
            this.state.visible = this.getVisible();
            this.renderDots();
            this.render();
            this.bind();
            this.start();
        },

        getVisible() {
            if (window.innerWidth >= 1100) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        },

        maxIndex() {
            return Math.max(0, this.elements.slides.length - this.state.visible);
        },

        renderDots() {
            const { dots } = this.elements;
            if (!dots) return;
            dots.innerHTML = '';

            for (let i = 0; i <= this.maxIndex(); i++) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'project-dot';
                button.setAttribute('aria-label', `Lihat project ${i + 1}`);
                button.addEventListener('click', () => {
                    this.goTo(i);
                    this.restart();
                });
                dots.appendChild(button);
            }
        },

        render() {
            const { track, prev, next, counter, dots } = this.elements;
            this.state.index = Math.min(this.state.index, this.maxIndex());
            const width = this.elements.slides[0]?.getBoundingClientRect().width || 0;
            track.style.transform = `translate3d(-${this.state.index * width}px, 0, 0)`;

            if (prev) prev.disabled = this.state.index === 0;
            if (next) next.disabled = this.state.index >= this.maxIndex();
            if (counter) counter.textContent = `${String(this.state.index + 1).padStart(2, '0')} / ${String(this.elements.slides.length).padStart(2, '0')}`;

            if (dots) {
                [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === this.state.index));
            }
        },

        goTo(index) {
            this.state.index = Math.max(0, Math.min(index, this.maxIndex()));
            this.render();
        },

        next() {
            this.goTo(this.state.index >= this.maxIndex() ? 0 : this.state.index + 1);
        },

        previous() {
            this.goTo(this.state.index <= 0 ? this.maxIndex() : this.state.index - 1);
        },

        stop() {
            if (this.state.timer) clearInterval(this.state.timer);
            this.state.timer = null;
        },

        start() {
            this.stop();
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            if (this.elements.slides.length <= this.state.visible) return;
            this.state.timer = setInterval(() => this.next(), this.config.delay);
        },

        restart() { this.start(); },

        bind() {
            const { carousel, prev, next } = this.elements;
            prev?.addEventListener('click', () => { this.previous(); this.restart(); });
            next?.addEventListener('click', () => { this.next(); this.restart(); });

            carousel.addEventListener('mouseenter', () => this.stop());
            carousel.addEventListener('mouseleave', () => this.start());
            carousel.addEventListener('focusin', () => this.stop());
            carousel.addEventListener('focusout', () => this.start());

            carousel.addEventListener('touchstart', event => {
                this.state.startX = event.touches[0].clientX;
                this.state.deltaX = 0;
                this.stop();
            }, { passive: true });

            carousel.addEventListener('touchmove', event => {
                this.state.deltaX = event.touches[0].clientX - this.state.startX;
            }, { passive: true });

            carousel.addEventListener('touchend', () => {
                if (Math.abs(this.state.deltaX) >= this.config.swipe) {
                    this.state.deltaX < 0 ? this.next() : this.previous();
                }
                this.start();
            });

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const old = this.state.visible;
                    this.state.visible = this.getVisible();
                    if (old !== this.state.visible) this.renderDots();
                    this.render();
                }, 120);
            });
        }
    };

    /* ---------------------------------------------------------
       Profile lightbox
       --------------------------------------------------------- */
    const ProfileModal = {
        init() {
            const modal = $('#profile-modal');
            if (!modal) return;

            const triggers = $$('.profile-trigger, .mobile-profile-trigger');
            const closeButtons = $$('[data-profile-close]', modal);
            if (!triggers.length) return;

            const open = () => {
                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('overflow-hidden');
                modal.querySelector('.profile-modal-close')?.focus();
            };

            const close = () => {
                modal.classList.remove('is-open');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('overflow-hidden');
            };

            triggers.forEach(trigger => {
                trigger.addEventListener('click', event => {
                    event.preventDefault();
                    open();
                });
                trigger.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        open();
                    }
                });
            });

            closeButtons.forEach(button => button.addEventListener('click', close));
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
            });
        }
    };

    function init() {
        Theme.init();
        ProfileModal.init();
        Theme.bind();
        DesktopSidebar.init();
        MobileNav.init();
        ActiveNav.init();
        Typing.init();
        ScrollUI.init();
        Clipboard.init();
        Reveal.init();
        CardMotion.init();
        MicroInteractions.init();
        ProjectCarousel.init();
    }

    return { init };
})();



document.addEventListener('DOMContentLoaded', App.init);
