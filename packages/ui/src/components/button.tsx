import { type HTMLProps } from 'react';
import { match } from 'ts-pattern';

import { cx } from '../utils/cx';

type ButtonProps = Pick<
  HTMLProps<HTMLButtonElement>,
  'children' | 'disabled' | 'name' | 'onClick' | 'type' | 'value'
> & {
  color?: 'error' | 'primary' | 'success';
  fill?: boolean;
  size?: 'regular' | 'small';
  submitting?: boolean;
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  children,
  color,
  disabled,
  fill,
  size,
  submitting,
  type = 'button',
  variant,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={getButtonCn({ color, fill, size, variant })}
      disabled={!!disabled || !!submitting}
      // @ts-expect-error b/c TS does not like it...
      type={type}
      {...rest}
    >
      {children}
      {/* {submitting && <Spinner color={color} />} */}
    </button>
  );
};

export function getButtonCn({
  color = 'primary',
  fill = false,
  size = 'regular',
  variant = 'primary',
}: Pick<ButtonProps, 'color' | 'fill' | 'size' | 'variant'>) {
  return cx(
    'flex items-center justify-center gap-2 rounded-full border border-solid',
    'hover:opacity-80',
    'transition-opacity',
    'disabled:opacity-50',

    match(color)
      .with('error', () => 'border-red-600')
      .with('primary', () => 'border-primary')
      .with('success', () => 'border-green-600')
      .exhaustive(),

    match(fill)
      .with(true, () => 'w-full')
      .with(false, () => 'w-max')
      .exhaustive(),

    match(size)
      .with('regular', () => 'px-4 py-3')
      .with('small', () => 'px-3 py-2')
      .exhaustive(),

    match(variant)
      .with('primary', () =>
        match(color)
          .with('error', () => 'bg-red-600 text-white')
          .with('primary', () => 'bg-primary text-white')
          .with('success', () => 'bg-green-600 text-white')
          .exhaustive()
      )
      .with('secondary', () =>
        match(color)
          .with('error', () => 'text-red-600')
          .with('primary', () => 'text-primary')
          .with('success', () => 'text-green-600')
          .exhaustive()
      )
      .exhaustive()
  );
}
