<?php
namespace app\ppt\controller;

class Index extends Common
{
    public function _initialize(){
        parent::_initialize();
    }
    public function index()
    {
        $links=db("link")->select();
        $this->assign("links",$links);
        $cases=db("ppt_case")->field("id,customer_name,title,cover_image,description")->limit(9)->select();
        $this->assign("cases",$cases);
        $this->assign(
            array(
                "title"=>$this->configs["ppt_title"],
                "keywords"=>$this->configs["ppt_keywords"],
                "description"=>$this->configs["ppt_description"]
            )
        );
        return view();
    }
}
