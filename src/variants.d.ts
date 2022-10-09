/**
 * Modifies the way variant utilities are generated for scrollbars.
 *
 * Tailwind isn't very good at styling arbitrary pseudo classes of pseudo
 * elements, so scrollbar colour classes keep track of a default, hover, and
 * active state and use the cascade to determine which one to use. Instead of
 * trying to style a pseudo class, scrollbar utilities modify the name of the
 * property that is being applied and apply directly to the original class.
 */
export function addVariantOverrides({ addVariant, config }: {
    addVariant: any;
    config: any;
}): void;
