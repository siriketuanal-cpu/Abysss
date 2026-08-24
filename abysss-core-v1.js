/**
 * Abyss Core v1 - Fixed Version
 * カードのDOM更新や起動時イベントにタイマー描画をバインド
 */
(function(window) {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const timerModel = window.abyssTimer || new window.AbyssTimerModel();

        // タイマー表示DOM要素の検索と自動復元描画
        const updateTimerUI = (state) => {
            const timerDisplays = document.querySelectorAll('.timer-display, [data-timer], #timer-display');
            if (!timerDisplays || timerDisplays.length === 0) return;

            const m = String(Math.floor(state.remainingTime / 60)).padStart(2, '0');
            const s = String(state.remainingTime % 60).padStart(2, '0');
            const timeStr = `${m}:${s}`;

            timerDisplays.forEach(el => {
                if (el.textContent !== timeStr) {
                    el.textContent = timeStr;
                }
            });
        };

        // モデル変更時のリスナー登録
        timerModel.subscribe(updateTimerUI);

        // DOM再構築・カード更新時の脱落防止（MutationObserverでDOM入れ替えを監視して再描画）
        const cards = document.querySelectorAll('.card, .game-card, [data-card]');
        cards.forEach(card => {
            const observer = new MutationObserver(() => {
                timerModel.forceRefresh();
            });
            observer.observe(card, { childList: true, subtree: true });

            // タップ/触れた時のフォールバック処理を維持
            card.addEventListener('pointerdown', () => {
                timerModel.forceRefresh();
            });
        });

        // 起動・初期化時に即座に1回呼び出し
        timerModel.forceRefresh();
    });
})(window);
