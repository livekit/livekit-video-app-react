import { Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { shallow } from 'enzyme';
import { LivekitError } from 'livekit-client';
import React from 'react';
import ErrorDialog from './ErrorDialog';

describe('the ErrorDialog component', () => {
  const message = 'Fake Error message';
  const code = 45345;

  it('should be closed if no error is passed', () => {
    const wrapper = shallow(<ErrorDialog dismissError={() => {}} error={null} />);
    expect(wrapper.find(Dialog).prop('open')).toEqual(false);
  });

  it('should be open if an error is passed', () => {
    const error = {} as LivekitError;
    const wrapper = shallow(<ErrorDialog dismissError={() => {}} error={error} />);
    expect(wrapper.find(Dialog).prop('open')).toEqual(true);
  });

  it('should display error message but not error code is the later does not exist', () => {
    const error = { message } as LivekitError;
    const wrapper = shallow(<ErrorDialog dismissError={() => {}} error={error} />);
    expect(wrapper.find(DialogContentText).text()).toBe(message);
    expect(wrapper.find('code').exists()).toBe(false);
  });

  it('should display error message and error code when both are given', () => {
    const error = { message, code } as LivekitError;
    const wrapper = shallow(<ErrorDialog dismissError={() => {}} error={error} />);
    expect(wrapper.find(DialogContentText).text()).toBe(message);
    expect(wrapper.find('code').exists()).toBe(true);
    expect(wrapper.find('code').text()).toBe(`Error Code: ${code}`);
  });

  it('should display an enhanced error message when error code is 20101', () => {
    const error = { message, code: 20101 } as LivekitError;
    const wrapper = shallow(<ErrorDialog dismissError={() => {}} error={error} />);
    expect(wrapper.find(DialogContentText).text()).toBe(
      message + '. Please make sure you are using the correct credentials.'
    );
    expect(wrapper.find('code').text()).toBe(`Error Code: ${20101}`);
  });

  it('should invoke dismissError prop when the user clicks on OK button', () => {
    const error = { message, code } as LivekitError;
    const dismissError = jest.fn();
    const wrapper = shallow(<ErrorDialog dismissError={dismissError} error={error} />);
    wrapper.find(Button).simulate('click');
    expect(dismissError).toHaveBeenCalled();
  });
});
