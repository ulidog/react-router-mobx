import { observable,action } from 'mobx';

class HomeStore {
    @observable bannerDetail = ''

    @action bannerDetailO (str){
        this.bannerDetail = str
    }
}

export default new HomeStore();