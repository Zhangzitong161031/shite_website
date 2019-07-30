<?php
namespace app\pack\controller;


class About extends Common
{
    public function _initialize(){
        parent::_initialize();
    }
    public function index()
    {
        $cases=db("pack_case")->select();
        foreach ($cases as $case){
            $id=$case['id'];
            $imgs=db("images")->where(["case_id"=>$id])->select();
            $str="";
            foreach ($imgs as $img){
                $str.="<p><img style='width: 90%' src='".$img["src"]."'></p>";
            }
            $case["content"].=$str;
            db("pack_case")->update($case);
            echo "99999<br>";
        }

//        $links=db("link")->select();
//        $this->assign("links",$links);
//        return view();
    }
}
