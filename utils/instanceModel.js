/* 统一输出实例化后的模块 */

// 期刊
import { classModel } from '../models/classic';
const classic = new classModel();

// 点赞
import { likeModel } from '../models/like';
const like = new likeModel();

export { classic, like };