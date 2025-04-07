module.exports = {
  /**
   * @param {string} component The scrollbar component
   * @returns {string} The colour utility property for the given component
   */
  colourUtility(component) {
    return `--_scrollbar-${component}`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default idle colour property for the given component
   */
  colourDefault(component) {
    return `--scrollbar-${component}`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default hover colour property for the given component
   */
  hoverColourDefault(component) {
    return `--scrollbar-${component}-hover`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default active colour property for the given component
   */
  activeColourDefault(component) {
    return `--scrollbar-${component}-active`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The radius utility property for the given component
   */
  radiusUtility(component) {
    return `--_scrollbar-${component}-radius`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default radius property for the given component
   */
  radiusDefault(component) {
    return `--scrollbar-${component}-radius`;
  }
};
