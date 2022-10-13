import OverlayMenu from '../../overlay-menu/modules/_OverlayMenu.es6';
import cleanString from '../../../06-utility/_cleanString.es6';
import { BREAKPOINTS } from '../../../00-config/_GESSO.es6';

class MobileMenu extends OverlayMenu {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The menu to turn into a mobile menu
   * @param context
   * @param {string|null} searchBlockClass - Optional selector for the search block.
   *   If included, the search block will be cloned into the mobile menu. Set to
   *   null to omit the search block from the mobile menu.
   * @param {string|null} utilityNavClass - Optional selector for the utility nav.
   *   If included, the utility nav will be cloned into the mobile menu. Set to
   *   null to omit the utility nav in the mobile menu.
   * @param {boolean} toggleSubnav - Whether sub-menus should be hidden initially and toggleable.
   * @param {string} mobileMenuBreakpoint - Breakpoint at which to switch to the mobile menu.
   * @param {string} classPrefix - BEM prefix used for original menu classes, e.g. '.dropdown-menu'
   * @param {string} otherBlockClass - Optional selector for additional block(s) to clone.
   */
  constructor(
    domNode,
    context,
    {
      searchBlockClass = '.c-search',
      utilityNavClass = '.c-menu--utility',
      logoClass = '.l-header__logo',
      toggleSubnav = true,
      mobileMenuBreakpoint = `(max-width: ${BREAKPOINTS['mobile-menu']})`,
      classPrefix = '',
      otherBlockClass = '',
      imagePath = '',
    } = {}
  ) {
    super(null);
    this.menu = domNode;
    this.searchBlock = searchBlockClass
      ? context.querySelector(searchBlockClass)
      : null;
    this.utilityNav = utilityNavClass
      ? context.querySelector(utilityNavClass)
      : null;
    this.otherBlocks = otherBlockClass
      ? context.querySelectorAll(otherBlockClass)
      : null;
    this.logo = logoClass ? context.querySelector(logoClass) : null;
    this.options = {
      toggleSubnav,
      mobileMenuBreakpoint,
      classPrefix,
      imagePath,
    };
    this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Create the outer overlay that will hold the mobile menu.
   * @return {HTMLElement}
   */
  createMenuOverlay() {
    const overlay = document.createElement('nav');
    overlay.setAttribute('aria-modal', 'true');
    overlay.classList.add('c-mobile-menu');
    return this.menu.insertAdjacentElement('afterend', overlay);
  }

  /**
   * Clone a Drupal block to include in the mobile menu.
   * @param {HTMLElement} block - The block to clone
   * @param {string} blockClass - Optional CSS class to add to the cloned block
   * @return {HTMLElement}
   */
  cloneBlock(block, blockClass = '') {
    const blockClone = block.cloneNode(true);
    const idsToUpdate = blockClone.querySelectorAll('[id], [for]');
    if (blockClass) {
      blockClone.classList.add(blockClass);
    }
    if (blockClone.id) {
      blockClone.id = `${blockClone.id}-mobile`;
    }

    // Keeps forms working after cloning.
    idsToUpdate.forEach(element => {
      if (element.id) {
        element.id += '-mobile';
      }

      if (element.hasAttribute('for')) {
        element.setAttribute('for', `${element.getAttribute('for')}-mobile`);
      }
    });
    return blockClone;
  }

  /**
   * Create a toggle button to hide/show a subnav.
   * @param {HTMLElement} subnav - The submenu the toggle button will be used to display.
   * @return {Element}
   */
  createToggleButton(subnav) {
    const button = document.createElement('button');
    button.classList.add('c-mobile-menu__subnav-toggle');
    button.setAttribute('aria-controls', subnav.id);
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `<svg class="c-icon c-mobile-menu__subnav-icon" role="img">
  <title>Toggle submenu</title>
  <use xlink:href="${this.options.imagePath}/sprite.artifact.svg#plus"></use>
</svg>`;
    return subnav.insertAdjacentElement('beforebegin', button);
  }

  /**
   * Set up a submenu by adding a toggle button if one does not exist already,
   * and using it to hide/show the subnav.
   * @param {HTMLElement} link - The top-level menu link or button.
   * @param {HTMLElement} subnav - The submenu to hide/show.
   */
  setupSubnav(link, subnav) {
    const toggleButton =
      link.tagName === 'BUTTON' ? link : this.createToggleButton(subnav);
    subnav.style.display = 'none';
    toggleButton.addEventListener('click', event => {
      event.preventDefault();
      if (toggleButton.getAttribute('aria-expanded') === 'true') {
        subnav.style.display = 'none';
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.parentElement
          .querySelector('.c-mobile-menu__link')
          .classList.remove('is-expanded');
        subnav.classList.remove('is-open');
        this.enableTab(this.overlay);
      } else {
        subnav.style.display = 'block';
        toggleButton.setAttribute('aria-expanded', 'true');
        toggleButton.parentElement
          .querySelector('.c-mobile-menu__link')
          .classList.add('is-expanded');
        subnav.classList.add('is-open');
        subnav.hidden = false;
        subnav.querySelector('.c-mobile-menu__link').focus();
        this.enableTab(this.overlay);
      }
    });
  }

  /**
   * Clone a menu and its submenus to include in the mobile menu.
   * @param {HTMLElement} menu - The menu to clone.
   * @param {string} menuClass - Optional CSS class to add to the menu.
   * @return {Node}
   */
  cloneMenu(menu, menuClass = '') {
    const menuClone = menu.cloneNode(true);
    if (menuClass) {
      menuClone.classList.remove(`${this.options.classPrefix}`);
      menuClone.classList.add(menuClass);
    }
    const subNavTypeClass = this.options.toggleSubNav
      ? 'c-mobile-menu__menu--toggle-subnav'
      : 'c-mobile-menu__menu--show-subnav';
    menuClone.classList.add(subNavTypeClass);

    // Swap classes on the mobile menu items.
    const menuItems = menuClone.querySelectorAll(
      `.${this.options.classPrefix}__item, .${this.options.classPrefix}-item`
    );
    if (menuItems.length) {
      menuItems.forEach(item => {
        item.classList.remove(`${this.options.classPrefix}__item`);
        item.classList.remove(`${this.options.classPrefix}-item`);
        item.classList.add('c-mobile-menu__item');
      });
    }

    // Swap classes on mobile menu links.
    const menuLinks = menuClone.querySelectorAll(
      `.${this.options.classPrefix}__link, .${this.options.classPrefix}-link`
    );
    menuLinks.forEach(link => {
      link.classList.remove(`${this.options.classPrefix}__link`);
      link.classList.remove(`${this.options.classPrefix}-link`);
      link.classList.add('c-mobile-menu__link');
    });

    // Swap classes on mobile menu descriptions.
    const menuDescriptions = menuClone.querySelectorAll(
      `.${this.options.classPrefix}__description`
    );
    menuDescriptions.forEach(description => {
      description.classList.remove(`${this.options.classPrefix}__description`);
      description.classList.add('c-mobile-menu__description');
    });

    // Swap classes on menu sections, if applicable.
    const menuSections = menuClone.querySelectorAll(
      `.${this.options.classPrefix}__section`
    );
    if (menuSections.length) {
      menuSections.forEach(section => {
        section.classList.remove(`${this.options.classPrefix}__section`);
        section.classList.add('c-mobile-menu__section');
        section.id = `${section.id}-mobile`;

        const sectionInner = section.querySelector(
          `.${this.options.classPrefix}__section-inner`
        );
        if (sectionInner) {
          sectionInner.classList.remove(
            `${this.options.classPrefix}__section-inner`
          );
          sectionInner.classList.add('c-mobile-menu__section-inner');
        }

        const sectionOverview = section.querySelector(
          `.${this.options.classPrefix}__overview`
        );
        if (sectionOverview) {
          sectionOverview.classList.remove(
            `${this.options.classPrefix}__overview`
          );
        }
      });
    }

    // Add class to social links
    const socialLinks = menuClone.querySelectorAll('.c-social-links');
    socialLinks.forEach(socialLink => {
      socialLink.classList.add('c-mobile-menu__social');
    });

    // Add class to cards
    const cards = menuClone.querySelectorAll('.c-card');
    cards.forEach(card => {
      card.classList.add('c-card--on-dark');
      card.querySelectorAll('.c-arrow-link').forEach(arrow => {
        arrow.classList.add('c-arrow-link--white');
      });
    });

    // Prep sub-menus, if applicable.
    const subMenus = menuClone.querySelectorAll(
      `.${this.options.classPrefix}__subnav`
    );
    if (subMenus.length) {
      subMenus.forEach((submenu, index) => {
        let link = submenu
          .closest('.c-mobile-menu__item')
          .querySelector('.c-mobile-menu__link');
        // Swap submenu classes and ID.
        submenu.classList.add('c-mobile-menu__subnav');
        submenu.classList.remove(`${this.options.classPrefix}__subnav`);
        submenu.id = cleanString(
          `mobile-menu-${link.innerText.trim()}${index || ''}`
        );
        if (
          this.options.toggleSubnav &&
          submenu.parentElement.classList.contains(
            'c-mobile-menu__section-inner'
          )
        ) {
          if (link.tagName === 'BUTTON') {
            const linkParent = link.parentElement;
            const newItem = linkParent.querySelector('.c-mobile-menu__item');
            if (newItem) {
              const newLink = newItem.querySelector('.c-mobile-menu__link');
              linkParent.insertAdjacentElement('afterbegin', newLink);
              linkParent.removeChild(link);
              newItem.parentElement.removeChild(newItem);
              link = newLink;
            }
          }
          this.setupSubnav(link, link.nextElementSibling);
        }
      });
    }
    return menuClone;
  }

  /**
   * Hide the original or mobile menu, depending on screen size.
   * @return void
   */
  toggleMenuDisplay() {
    if (window.matchMedia(this.options.mobileMenuBreakpoint).matches) {
      this.menuButton.style.display = 'block';
      if (this.searchBlock) {
        this.searchBlock.style.display = 'none';
      }
      this.menu.style.display = 'none';
      if (this.utilityNav) {
        this.utilityNav.style.display = 'none';
      }
      this.closeMenu();
    } else {
      this.closeMenu();
      this.menuButton.style.display = 'none';
      if (this.searchBlock) {
        this.searchBlock.style.display = '';
      }
      this.menu.style.display = '';
      if (this.utilityNav) {
        this.utilityNav.style.display = '';
      }
    }
  }

  /**
   * @inheritdoc
   */
  enableTab(startingPoint) {
    super.enableTab(startingPoint);
    if (this.options.toggleSubnav) {
      let subSections = startingPoint.querySelectorAll(
        '.c-mobile-menu__section'
      );
      if (!subSections.length) {
        subSections = startingPoint.querySelectorAll('.c-mobile-menu__subnav');
      }
      subSections.forEach(subSection => {
        if (subSection.hidden || !subSection.classList.contains('is-open')) {
          const subSectionItems = subSection.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]'
          );
          subSectionItems.forEach(item => {
            item.setAttribute('tabindex', '-1');
          });
        }
      });
    }
  }

  /**
   * Handle mouse clicks.
   * @param {MouseEvent} event - The click event
   * @return void
   */
  handleClick(event) {
    if (
      event.target.matches('a') ||
      (!event.target.closest('.c-mobile-menu') &&
        !event.target.matches('.c-hamburger-button'))
    ) {
      this.closeMenu();
    }
  }

  openMenu() {
    super.openMenu();
    window.addEventListener('click', this.handleClick);
  }

  closeMenu() {
    window.removeEventListener('click', this.handleClick);
    super.closeMenu();
  }

  /**
   * Initialize the mobile menu.
   * @return void
   */
  init() {
    if (!this.menu) return;
    this.overlay = this.overlay ?? this.createMenuOverlay();
    super.init();
    if (this.logo) {
      const overlayHeader = document.createElement('div');
      overlayHeader.classList.add('c-mobile-menu__header');
      overlayHeader.insertAdjacentElement(
        'afterbegin',
        this.cloneBlock(this.logo, 'c-mobile-menu__logo')
      );
      overlayHeader.insertAdjacentElement('beforeend', this.closeButton);
      this.overlay.insertAdjacentElement('afterbegin', overlayHeader);
    }
    if (this.searchBlock) {
      const newSearchBlock = this.cloneBlock(
        this.searchBlock,
        'c-mobile-menu__search'
      );
      newSearchBlock.hidden = false;
      newSearchBlock.classList.remove('c-mega-menu__section');
      this.overlay.appendChild(newSearchBlock);
    }
    if (this.otherBlocks) {
      this.otherBlocks.forEach(block => {
        const newBlock = this.cloneBlock(block, 'c-mobile-menu__block');
        newBlock.hidden = false;
        this.overlay.appendChild(newBlock);
      });
    }
    this.overlay.appendChild(this.cloneMenu(this.menu, 'c-mobile-menu__menu'));
    if (this.utilityNav) {
      this.overlay.appendChild(
        this.cloneMenu(this.utilityNav, 'c-mobile-menu__menu')
      );
    }
    this.toggleMenuDisplay();
    let resizeTimeout = false;
    let lastWindowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      const currWindowWidth = window.innerWidth;

      if (lastWindowWidth !== currWindowWidth) {
        if (resizeTimeout !== false) {
          clearTimeout(resizeTimeout);
        }

        resizeTimeout = setTimeout(this.toggleMenuDisplay, 200);
        lastWindowWidth = currWindowWidth;
      }
    });
  }
}

export default MobileMenu;
