var MovieIndex = require('../app/controllers/movie/movie_index'),
// 电影首页控制器
// 电影首页模块路由控制器
User = require('../app/controllers/user/user'),
// 用户模块路由控制器
Movie = require('../app/controllers/movie/movie'),
// 电影模块路由控制器
MovieComment = require('../app/controllers/movie/movie_comment'),
// 电影评论控制器
Category = require('../app/controllers/movie/movie_category'),
// 电影分类控制器
City = require('../app/controllers/movie/movie_city'),
// 电影院分类控制器
// 音乐首页模块路由控制器
MusicIndex = require('../app/controllers/music/music_index'),
// 音乐首页控制器
Music = require('../app/controllers/music/music'),
// 音乐模块路由控制器
/* 音乐分类控制器 */
MusicCategory = require('../app/controllers/music/music_category'),
/* 音乐热门榜单控制器 */
Programmer = require('../app/controllers/music/music_programme'),
MusicComment = require('../app/controllers/music/music_comment'),
// 音乐评论控制器
multipart = require('connect-multiparty'),
multipartMiddleware = multipart();

module.exports = function(app) {
        // 预处理用户登录
        app.use(function(req, res, next) {
                app.locals.user = req.session.user; // 将session中保存的用户名存储到本地变量中
                next();
        });

        // 设置路由
        /*
		公共路由
	*/
        // 用户注册路由
        app.get('/signup', User.showSignup);
        app.post('/user/signup/', User.signup);
        // 用户登陆路由
        app.get('/signin', User.showSignin);
        app.get('/user/signin', User.signin);
        // 用户登出路由
        app.get('/logout', User.logout);
        //  用户列表路由
        app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
        // 用户列表删除电影路由
        app.delete('/admin/user/list', User.del);
        // 验证码路由
        app.get('/captcha', User.captcha);

        /*
		电影网站路由
	 */
        //  电影主页路由
        app.get('/', MovieIndex.index);
        // 首页电影搜索结果页
        app.get('/movie/results', MovieIndex.search);
        // 电影广告页
        app.get('/fullpage', MovieIndex.fullpage);

        // 电影详细页面路由
        app.get('/movie/:id', Movie.detail);
        app.delete('/movie/:id', MovieComment.del);
        app.post('/admin/movie/movieComment', User.signinRequired, MovieComment.save); // 用户评论
        // 后台录入路由
        // User.signinRequired 用户登录控制
        // User.adminRequired 用户权限控制
        app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
        // 更新电影路由
        app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
        // 后台录入路由
        app.post('/admin/movie', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
        // 电影列表路由
        app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
        // 电影列表删除电影路由
        app.delete('/admin/movie/list', Movie.del);

        // 电影分类路由
        app.get('/admin/movie/category/new', User.signinRequired, User.adminRequired, Category.new);
        app.post('/admin/movie/category', User.signinRequired, User.adminRequired, Category.save);
        app.get('/admin/movie/category/list', User.signinRequired, User.adminRequired, Category.list);
        // 电影分类列表删除电影路由
        app.delete('/admin/movie/category/list', Category.del);

        // 电影院搜索路由
        app.get('/admin/movie/city/new', User.signinRequired, User.adminRequired, City.new);
        app.post('/admin/movie/city', User.signinRequired, User.adminRequired, City.save);
        app.get('/admin/movie/city/list', User.signinRequired, User.adminRequired, City.list);
        // 电影院分类列表删除电影院路由
        app.delete('/admin/movie/city/list', City.del);

        /*
		豆瓣音乐网站路由
	*/
        // 音乐主页路由
        app.get('/musicindex', MusicIndex.index);
        // 豆瓣音乐搜索结果页
        app.get('/music/results', MusicIndex.search);
        // 音乐详细页面路由
        app.get('/music/:id', Music.detail);
        app.delete('/music/:id', MusicComment.del);
        app.post('/admin/music/musicComment', User.signinRequired, MusicComment.save); // 用户评论
        // 后台录入路由
        // User.signinRequired 用户登录控制
        // User.adminRequired 用户权限控制
        app.get('/admin/music/new', User.signinRequired, User.adminRequired, Music.new);
        // 更新豆瓣音乐路由
        app.get('/admin/music/update/:id', User.signinRequired, User.adminRequired, Music.update);
        // 后台录入路由
        app.post('/admin/music', multipartMiddleware, User.signinRequired, User.adminRequired, Music.savePoster, Music.save);
        // 豆瓣音乐列表路由
        app.get('/admin/music/list', User.signinRequired, User.adminRequired, Music.list);
        // 豆瓣音乐列表删除音乐路由
        app.delete('/admin/music/list', Music.del);

        // 豆瓣音乐分类路由
        app.get('/admin/music/musicCategory/new', User.signinRequired, User.adminRequired, MusicCategory.new);
        app.post('/admin/music/musicCategory', User.signinRequired, User.adminRequired, MusicCategory.save);
        app.get('/admin/music/musicCategory/list', User.signinRequired, User.adminRequired, MusicCategory.list);

        // 更新豆瓣音乐分类路由
        app.get('/admin/music/musicCategory/update/:id', User.signinRequired, User.adminRequired, MusicCategory.update);
        // 豆瓣音乐分类列表删除豆瓣音乐路由
        app.delete('/admin/music/musicCategory/list', MusicCategory.del);

        // 音乐热门榜单路由
        app.get('/admin/music/programme/new', User.signinRequired, User.adminRequired, Programmer.new);
        app.post('/admin/music/programme', User.signinRequired, User.adminRequired, Programmer.save);
        app.get('/admin/music/programme/list', User.signinRequired, User.adminRequired, Programmer.list);
        // 音乐首页热门榜单删除路由
        app.delete('/admin/music/programme/list', Programmer.del);

};