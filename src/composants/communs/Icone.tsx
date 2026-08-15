import React from 'react';
import { Icon, IconProps } from '@iconify/react';

export interface ProprietesIcone extends Omit<IconProps, 'icon'> {
  icone: string;
  className?: string;
}

export const Icone: React.FC<ProprietesIcone> = ({ icone, className = 'w-5 h-5', ...reste }) => {
  return <Icon icon={icone} className={className} {...reste} />;
};

export type TypeIcone = string | React.ComponentType<{ className?: string }>;

export const RenduIcone: React.FC<{ icone: TypeIcone; className?: string }> = ({ icone, className = 'w-4 h-4' }) => {
  if (typeof icone === 'string') {
    return <Icon icon={icone} className={className} />;
  }
  const ComposantIcone = icone;
  return <ComposantIcone className={className} />;
};
