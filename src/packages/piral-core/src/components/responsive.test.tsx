import * as React from 'react';
import * as hooks from '../hooks';
import { mount } from 'enzyme';
import { Responsive } from './responsive';
import { defaultBreakpoints } from '../utils';

jest.mock('../hooks');

(hooks as any).useGlobalState = (select: any) =>
  select({
    app: {
      layout: 'desktop',
    },
  });

const StubComponent: React.FC = () => <div />;
StubComponent.displayName = 'StubComponent';

describe('Responsive Module', () => {
  it('always renders the given children', () => {
    const changeTo = jest.fn();
    (hooks as any).useAction = () => changeTo;
    (hooks as any).useMedia = () => 'desktop';
    const node = mount(
      <Responsive breakpoints={defaultBreakpoints}>
        <StubComponent />)
      </Responsive>,
    );
    expect(node.find(StubComponent).length).toBe(1);
  });

  it('does not call changeTo when nothing changed', () => {
    const changeTo = jest.fn();
    (hooks as any).useAction = () => changeTo;
    (hooks as any).useMedia = () => 'desktop';
    mount(<Responsive breakpoints={defaultBreakpoints} />);
    expect(changeTo).not.toHaveBeenCalled();
  });

  it('does not call changeTo when nothing changed', () => {
    const changeTo = jest.fn();
    (hooks as any).useAction = () => changeTo;
    (hooks as any).useMedia = () => 'desktop';
    mount(<Responsive breakpoints={defaultBreakpoints} />);
    expect(changeTo).not.toHaveBeenCalled();
  });

  it('does calls changeTo when someething changed (desktop -> tablet)', () => {
    const changeTo = jest.fn();
    (hooks as any).useAction = () => changeTo;
    (hooks as any).useMedia = () => 'tablet';
    mount(<Responsive breakpoints={defaultBreakpoints} />);
    expect(changeTo).toHaveBeenCalledWith('tablet');
  });

  it('does calls changeTo when someething changed (desktop -> mobile)', () => {
    const changeTo = jest.fn();
    (hooks as any).useAction = () => changeTo;
    (hooks as any).useMedia = () => 'mobile';
    mount(<Responsive breakpoints={defaultBreakpoints} />);
    expect(changeTo).toHaveBeenCalledWith('mobile');
  });
});
