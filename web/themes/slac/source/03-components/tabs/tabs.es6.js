import Drupal from 'drupal';

Drupal.behaviors.slacTabs = {
  attach(context) {
    const tabSets = context.querySelectorAll('.c-tabs');
    tabSets.forEach((setOfTabs, setIndex) => {
      const tabList = setOfTabs.querySelector('.c-tabs__list');
      const tabPanels = Array.from(
        setOfTabs.querySelectorAll('.c-tabs__panel')
      );
      if (tabList) {
        const tabs = Array.from(tabList.querySelectorAll('a'));
        /**
         * Switch the currently displayed tab.
         *
         * If oldTab is not provided, the new tab will be displayed
         * without any other tabs being hidden (e.g. to display the first tab
         * initially).
         *
         * @param {HTMLAnchorElement} newTab
         * @param {HTMLAnchorElement} [oldTab]
         */
        const switchTab = (newTab, oldTab) => {
          if (oldTab) {
            const oldTabIndex = tabs.indexOf(oldTab);
            oldTab.removeAttribute('aria-selected');
            oldTab.setAttribute('tabindex', '-1');
            tabPanels[oldTabIndex].hidden = true;
          }
          const newTabIndex = tabs.indexOf(newTab);
          newTab.focus();
          newTab.removeAttribute('tabindex');
          newTab.setAttribute('aria-selected', 'true');
          tabPanels[newTabIndex].hidden = false;
        };
        /**
         * Update the displayed tab on click.
         * @param {MouseEvent} evt
         */
        const handleClick = evt => {
          const { currentTarget } = evt;
          evt.preventDefault();
          const currentTab = tabList.querySelector('[aria-selected]');
          if (currentTarget !== currentTab) {
            switchTab(currentTarget, currentTab);
          }
        };
        /**
         * Handle key presses in the tabs.
         *
         * For left/right arrow keys, change which tab is displayed. For the
         * down arrow key, move keyboard focus into the current panel.
         *
         * @param {KeyboardEvent} evt
         */
        const handleKeydown = evt => {
          const { currentTarget, key } = evt;
          if (
            key === 'ArrowLeft' ||
            key === 'ArrowRight' ||
            key === 'ArrowDown'
          ) {
            evt.preventDefault();
            const currentTabIndex = tabs.indexOf(currentTarget);
            if (key === 'ArrowDown') {
              tabPanels[currentTabIndex].focus();
              return;
            }
            let newTabIndex = currentTabIndex;
            if (key === 'ArrowLeft') {
              newTabIndex -= 1;
              if (newTabIndex < 0) {
                newTabIndex = tabs.length - 1;
              }
            } else {
              newTabIndex += 1;
              if (newTabIndex >= tabs.length) {
                newTabIndex = 0;
              }
            }
            switchTab(tabs[newTabIndex], currentTarget);
          }
        };
        tabList.setAttribute('role', 'tablist');
        tabs.forEach((tab, tabIndex) => {
          tab.setAttribute('role', 'tab');
          tab.id = `tab-${setIndex}-${tabIndex}`;
          tab.setAttribute('tabindex', '-1');
          tab.parentElement.setAttribute('role', 'presentation');
          tab.addEventListener('click', handleClick);
          tab.addEventListener('keydown', handleKeydown);
        });
        tabPanels.forEach((panel, panelIndex) => {
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('tabindex', '-1');
          panel.setAttribute('aria-labelledby', tabs[panelIndex].id);
          panel.hidden = true;
        });
        switchTab(tabs[0]);
      }
    });
  },
};
