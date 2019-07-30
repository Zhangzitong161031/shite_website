<?php
namespace app\index\controller;

class Cate extends Common
{
    public function _initialize(){
        parent::_initialize();
    }
    public function index(){
        $links=db("link")->select();
        $this->assign("links",$links);
        $cid=input("cid");
        $currentCate=db("cate")->where(['id'=>$cid])->find();
        $template=str_replace(" ","_",$currentCate['catename']);
        $template=str_replace("(","",$template);
        $template=str_replace(")","",$template);
        $this->assign(array(
            "currentCate"=>$currentCate,
            "title"=>$currentCate["title"],
            "keywords"=>$currentCate["title"],
            "description"=>$currentCate["desc"],
            "cid"=>$currentCate["id"]
        ));
        return $this->fetch($template);
    }
}
