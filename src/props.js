module.exports = {
  /**
   * @param {string} component The scrollbar component
   * @returns {string} The colour utility property for the given component
   */
  colourUtility(component) {
    return `--_scrollbar-${component}-color`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default idle colour property for the given component
   */
  colourDefault(component) {
    return `--scrollbar-${component}-color`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default hover colour property for the given component
   */
  hoverColourDefault(component) {
    return `--scrollbar-${component}-hover-color`;
  },

  /**
   * @param {string} component The scrollbar component
   * @returns {string} The default active colour property for the given component
   */
  activeColourDefault(component) {
    return `--scrollbar-${component}-active-color`;
  },

  /**
   * @param {'width' | 'height'} dimension The scrollbar dimension
   * @returns {string} The utility property for the given dimension
   */
  dimensionUtility(dimension) {
    return `--_scrollbar-${dimension}`;
  },

  /**
   * @param {'width' | 'height'} dimension The scrollbar dimension
   * @returns {string} The default property for the given dimension
   */
  dimensionDefault(dimension) {
    return `--scrollbar-${dimension}`;
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
