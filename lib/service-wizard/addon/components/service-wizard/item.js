import Component from '@glimmer/component';
import { action } from "@ember/object";
import { guidFor } from "@ember/object/internals";

export default class ServiceWizardItemComponent extends Component {
  get name() {
    const { name } = this.args;
    return name ? name : guidFor(this);
  }

  get isVisible() {
    const { isVisible = true } = this.args;
    return isVisible;
  }

  get currentOrder() {
    const { steps, order } = this.args;
    const stepOrder = steps.reduce((container, i) => {
      container[i.name] = true;
      return container;
    }, {});
    const currentOrder =  order.reduce((container, i) => {
      if (stepOrder[i]) {
        container.push(i)
      }

      return container;
    }, []);

    return currentOrder;
  }

  constructor(...args) {
    super(...args);

    this.args['registerStepOrder'](this.name);
  }

  willDestroy(...args) {
    this.args['unregisterStepOrder'](this.name);

    super.willDestroy(...args);
  }

  @action
  prevStep() {
    const { name } = this;
    const { transitionTo } = this.args;
    const { currentOrder } = this;

    const currentIndex = currentOrder.findIndex(i => i === name);
    const prevStep = currentOrder[currentIndex - 1];

    if (!prevStep) {
      return
    }

    transitionTo(prevStep);
  }

  @action
  nextStep() {
    const { name } = this;
    const { transitionTo } = this.args;
    const { currentOrder } = this;

    const currentIndex = currentOrder.findIndex(i => i === name);
    const nextStep = currentOrder[currentIndex + 1];

    if (!nextStep) {
      return
    }

    transitionTo(nextStep);
  }
}
