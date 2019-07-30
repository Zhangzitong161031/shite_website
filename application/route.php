<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    '__pattern__' => [
        'name' => '\w+',
        'id'=>'\d+',
        'cid'=>'\d+',
        'page'=>'\d+',
        'typename'=>'\w+',
        "site"=>'\d+',
        "urlprefix"=>'\w+',
        "urlpre_fix"=>'\w+',
        "industry_type_id"=>'\d+',
    ],

    // admin模块
    '[admin]' => [
        '$' => 'admin/index',
        'cate_list/[:site]$' => 'admin/cate/lst',
        'cate_add/:site$' => 'admin/cate/add',
        'cate_update/[:site]$' => 'admin/cate/update'
    ],
    // pack模块
    '[pack]' => [
        '$' => 'pack/index/index',
        'about$' => ['pack/about/index', ['method' => 'get']],
        'contact' => ['pack/contact/index', ['method' => 'get']],
        'case/:id$' => ['pack/cases/detail', ['id' => '\d+', 'method' => 'get']],
        'law/:id$' => ['pack/law/detail', ['id' => '\d+', 'method' => 'get']],
        ':url_prefix$'=>['pack/cases/lst',['page' => 1,"param_depr"=>"/"]],
        ':url_prefix/[:page]$'=>'pack/cases/lst',
    ],
    //ppt模块
    '[ppt]' => [
        '$' => ['ppt/index/index', ['method' => 'get']],
        'about$' => ['ppt/about/index', ['method' => 'get', 'ext' => 'html']],
        'contact' => ['ppt/contact/index', ['method' => 'get', 'ext' => 'html']],
        'case/:id$' => ['ppt/cases/detail', ['id' => '\d+', 'method' => 'get']],
        ':url_prefix$'=>['ppt/cases/lst',['page' => 1,"param_depr"=>"/"]],
        ':url_prefix/[:page]$'=>'ppt/cases/lst',
    ],
    //index模块
    '$' => 'index/index/index',
    'about$' => 'index/about/index',
    'contact$' => 'index/contact/index',
    "news$"=>"index/news/index",
    "news/:id$"=>"index/news/detail",
    "concept/[:page]$"=>"index/news/conceptLst",
    "point/[:page]$"=>"index/news/pointLst",
    "dynamic_news/[:page]$"=>"index/news/dynamicList",
    'case/:id$' => ['index/cases/detail',['id' => '\d+']],
    ':url_prefix/industry_type/:industry_type_id$'=>['index/cases/lst',['page' => 1]],
    ':url_prefix/industry_type/:industry_type_id/[:page]$'=>'index/cases/lst',
    ':url_prefix$'=>['index/cases/lst',['page' => 1]],
    ':url_prefix/[:page]$'=>'index/cases/lst',
];
