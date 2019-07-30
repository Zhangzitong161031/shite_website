<?php
namespace app\ppt\controller;

use app\ppt\model\Cate;

class Cases extends Common
{
    public function _initialize()
    {
        parent::_initialize();
        $this->case_top_cates=db("cate")->where(["pid"=>141])->select();
        $this->list_page_size=33;
    }
    public function lst($url_prefix="",$page=1){
        // dump("ppt list,url_prefix is $url_prefix");die();
        $cate_info=db("cate")->where(["url_prefix"=>$url_prefix,"site"=>3])->find();
        if (!$cate_info){
            throw new \think\exception\HttpException(404);
        }
        $cur_top_cate=$cate_info;
        $cate=new  Cate();
        $cate_ids=$cate->getchilrenid($cate_info["id"]);
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $cases = db("ppt_case")
            ->field("id,customer_name,title,cover_image")
            ->where("cate_id in ({$cate_ids})")
            ->order("sort asc")
            ->paginate(33);
        $slides = db("advertisement")->where(["type" => 0])->order("sort asc")->select();
        $this->assign(
            [
                "title"=>$cate_info["title"],
                "keywords"=>$cate_info["keywords"],
                "description"=>$cate_info["desc"],
                "cur_top_cate"=>$cur_top_cate,
                "cur_cate_info"=>$cate_info,
                "slides" => $slides,
                "cases"=>$cases,
            ]
        );
        return view("list");
    }

    public function detail($id){
        $case_detail=db("ppt_case")->find($id);
        $cate_id=$case_detail["cate_id"];
        $cate_info=db("cate")->find($cate_id);
        $next_case=db("ppt_case")->where(["cate_id"=>$cate_id,"id"=>["gt",$id]])->find();
        $pre_case=db("ppt_case")->where(["cate_id"=>$cate_id,"id"=>["lt",$id]])->find();
        $images=db("images")->where(["case_id"=>$id])->select();
        $this->assign(array(
            "title"=>$case_detail["title"],
            "keywords"=>$case_detail["keywords"],
            "description"=>$case_detail["description"],
            "pre_case"=>$pre_case,
            "next_case"=>$next_case,
            "case"=>$case_detail,
            "cur_cate_info"=>$cate_info,
            "related_cases"=>$this->getRelatedCases($case_detail),
            "images"=>$images
        ));
        return view("detail");
    }

    public function getSonCates($pid){
        $sonCates = db("cate")->where(["pid" => $pid])->field("id,catename,url_prefix")->select();
        return $sonCates;
    }

    public function getRelatedCases($case_detail){
        $related_map=array(
            "Industry_type_id"=>$case_detail["Industry_type_id"],
            "cate_id"=>$case_detail["cate_id"],
            "id"=>["neq",$case_detail["id"]]
        );
        $related_cases=db("ppt_case")
            ->field("id,customer_name,title,cover_image")
            ->where($related_map)
            ->order("sort asc")
            ->limit(6)
            ->select();
        return $related_cases;
    }
}