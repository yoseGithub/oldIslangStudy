import HTTP from "../utils/http.js";

class ClassicModel extends HTTP {
    getLatest (sCallBack) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallBack(res);
            }
        });
    }

    getPrevious (index, sCallBack) {
        this.request({
            url: `classic/${index}/previous`,
            success: (res) => {
                sCallBack(res);
            }
        });
    }
}

export const classModel =  ClassicModel;