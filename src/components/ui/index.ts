// Componentes compartidos de interfaz, agrupados por función.

// Acciones: lo que el usuario toca para hacer algo.
export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './actions/button';
export { Chip, type ChipProps } from './actions/chip';
export { IconButton, type IconButtonProps } from './actions/icon-button';
export { QuantityStepper, type QuantityStepperProps } from './actions/quantity-stepper';

// Formularios: entrada de datos.
export { Checkbox, type CheckboxProps } from './forms/checkbox';
export { PhonePrefix } from './forms/phone-prefix';
export { Radio } from './forms/radio';
export { TextField, type TextFieldProps } from './forms/text-field';

// Visualización: muestran información, no se tocan.
export { Divider } from './display/divider';
export { FoodThumb, type FoodThumbProps } from './display/food-thumb';
export { Icon, type IconName, type IconProps } from './display/icon';
export { MapPlaceholder, type MapPlaceholderProps } from './display/map-placeholder';
export { Pill, type PillProps, type PillTone } from './display/pill';
export { SectionHeader, type SectionHeaderProps } from './display/section-header';

// Superficies: contenedores con fondo.
export { Card, type CardProps } from './surfaces/card';
export { ThemedView, type ThemedViewProps } from './surfaces/themed-view';

// Texto.
export { ThemedText, type ThemedTextProps } from './text/themed-text';
