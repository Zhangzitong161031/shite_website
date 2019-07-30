<?php
namespace app\index\controller;


class About extends Common
{
    public function index()
    {
        $cate=db("cate")->where(["id"=>118])->find();
        $banner_pc=db("advertisement")->where(["type"=>4])->find();
        $banner_m=db("advertisement")->where(["type"=>5])->find();
        $this->assign(array(
            "nav_index"=>2,
            "title"=>$cate["title"],
            "keywords"=>$cate["keywords"],
            "description"=>$cate["desc"],
            "content"=>$cate["content"],
            "banner_pc"=>$banner_pc,
            "banner_m"=>$banner_m,
        ));
        return view("page/about");
    }
}
