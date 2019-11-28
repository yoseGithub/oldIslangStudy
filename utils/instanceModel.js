/* 统一输出实例化后的模块 */

// 期刊
import { ClassicModel } from '../models/classic';
const classicIns = new ClassicModel();

// 点赞
import { LikeModel } from '../models/like';
const likeIns = new LikeModel();

// 书籍
import { BookModel } from '../models/book';
const bookIns = new BookModel();

export { classicIns, likeIns, bookIns };