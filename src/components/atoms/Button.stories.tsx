import React from 'react';
import {action} from '@storybook/addon-actions';
import {AnyWayButton} from './AnyWayButton';

export default {
  title: 'Buttons',
};

export const ButtonPrimary = () => <AnyWayButton onClick={action('clicked')}>Button Primary</AnyWayButton>;
