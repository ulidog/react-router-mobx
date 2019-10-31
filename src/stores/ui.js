import { observable } from 'mobx';

class UiStore {
    @observable rootFontSize = 'this is home page';
    @observable rootHeight = 'this is home page'
}

export default new UiStore();