import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from "@ember/object";
import { schedule } from "@ember/runloop";

export default class ServiceWizardComponent extends Component {
  @tracked stepOrder = [];

  @action
  registerStepOrder(name) {
    schedule('actions', () => {
      this.stepOrder = [...this.stepOrder, name];
    });
  }

  @action
  unregisterStepOrder(name) {
    schedule('actions', () => {
      this.stepOrder = this.stepOrder.filter(i => i !== name);
    });
  }
}
