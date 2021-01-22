import { shallow } from 'enzyme';
import Livekit from 'livekit-client';
import React from 'react';
import UnsupportedBrowserWarning from './UnsupportedBrowserWarning';

describe('the UnsupportedBrowserWarning component', () => {
  it('should render correctly when isSupported is false', () => {
    // @ts-ignore
    Livekit.isSupported = false;
    const wrapper = shallow(
      <UnsupportedBrowserWarning>
        <span>Is supported</span>
      </UnsupportedBrowserWarning>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children when isSupported is true', () => {
    // @ts-ignore
    Livekit.isSupported = true;
    const wrapper = shallow(
      <UnsupportedBrowserWarning>
        <span>Is supported</span>
      </UnsupportedBrowserWarning>
    );
    expect(wrapper.text()).toBe('Is supported');
  });
});
