<?php
namespace app\pack\controller;

class Index extends Common
{
    public function _initialize(){
        parent::_initialize();
    }
    public function index()
    {
        $cases=db("pack_case")
                ->field("id,customer_name,title,cover_image,description")
                ->limit(12)
                ->order("sort asc")
                ->select();
        $medical_propagand_cases=db("pack_case")
            ->field("id,customer_name,title,cover_image,description")
            ->where(["cate_id"=>264])
            ->limit(4)
            ->order("sort asc")
            ->select();
        $medical_logo_cases=db("pack_case")
            ->field("id,customer_name,title,cover_image,description")
            ->where(["cate_id"=>263])
            ->limit(4)
            ->order("sort asc")
            ->select();
        $laws=db("law")->limit(6)->select();
        $links=db("link")->select();
        $this->assign(
            [
                "medical_logo_cases"=>$medical_logo_cases,
                "medical_propagand_cases"=>$medical_propagand_cases,
                "cases"=>$cases,
                "laws"=>$laws,
                "nav_index"=>1,
                "links"=>$links,
                "title"=>$this->configs["pack_title"],
                "keywords"=>$this->configs["pack_keywords"],
                "description"=>$this->configs["pack_description"]
            ]
        );
        return view();
    }
}
