/**
 * Abyss Timer Model v1 - Fixed Version
 * 起動時・更新時のタイマー消失・非同期DOM離脱バグ修正版
 */
(function(window) {
    'use strict';

    class AbyssTimerModel {
        constructor() {
            this.state = {
                remainingTime: 0,
                isRunning: false,
                lastUpdated: Date.now()
            };
            this.listeners = new Set();
            this.timerId = null;
        }

        /**
         * 描画リスナー登録（登録時に即座に現在状態を通知して初期描画漏れを防ぐ）
         */
        subscribe(listener) {
            this.listeners.add(listener);
            // 初回登録時に安全に描画を叩く
            this.notify();
            return () => this.listeners.delete(listener);
        }

        /**
         * 画面描画の安全な通知 (requestAnimationFrame を使用してブラウザ描画フレームと同期)
         */
        notify() {
            if (typeof window !== 'undefined' && window.requestAnimationFrame) {
                window.requestAnimationFrame(() => {
                    this.listeners.forEach(listener => {
                        try {
                            listener(this.state);
                        } catch (e) {
                            console.error('[AbyssTimer] Listener execution error:', e);
                        }
                    });
                });
            } else {
                this.listeners.forEach(listener => listener(this.state));
            }
        }

        /**
         * タイマー開始
         */
        start(duration) {
            if (this.timerId) clearInterval(this.timerId);
            
            if (typeof duration === 'number') {
                this.state.remainingTime = duration;
            }
            this.state.isRunning = true;
            this.state.lastUpdated = Date.now();
            this.notify();

            this.timerId = setInterval(() => {
                if (this.state.remainingTime > 0) {
                    this.state.remainingTime--;
                    this.notify();
                } else {
                    this.stop();
                }
            }, 1000);
        }

        /**
         * タイマー停止
         */
        stop() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
            this.state.isRunning = false;
            this.notify();
        }

        /**
         * カード操作・更新時に呼ばれる強制再描画・再同期
         */
        forceRefresh() {
            this.notify();
        }
    }

    window.AbyssTimerModel = AbyssTimerModel;
    if (!window.abyssTimer) {
        window.abyssTimer = new AbyssTimerModel();
    }
})(window);
