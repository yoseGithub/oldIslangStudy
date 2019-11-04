import HTTP from "../utils/http.js";

class LikeModel extends HTTP {
    toggleLike (behavior, artID, category) {
        let url = behavior === 'like' ? 'like' : 'like/cancel';

        this.request({
            url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            }
        })
    }
}

export const likeModel = LikeModel;