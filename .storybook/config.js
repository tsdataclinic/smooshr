import { configure } from '@storybook/react';
import '@storybook/addon-knobs/register';


function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
