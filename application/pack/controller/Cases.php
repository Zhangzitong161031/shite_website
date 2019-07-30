<?php
namespace app\pack\controller;

use think\Controller;
use app\pack\model\Cate;
class Cases extends Common
{

    public function _initialize()
    {
        parent::_initialize();
        $this->case_top_cates=db("cate")->where(["pid"=>141])->select();
        $this->list_page_size=12;
    }
    public function lst($url_prefix="",$page=1){
        // dump("pack list,url_prefix is $url_prefix");die();
        $cate_info=db("cate")->where(["url_prefix"=>$url_prefix,"site"=>2])->find();
        if (!$cate_info){
            throw new \think\exception\HttpException(404);
        }
        if($cate_info["pid"]!=276&&$cate_info["id"]!=276){
            $cur_top_cate=db("cate")->find($cate_info["pid"]);
        }else{
            $cur_top_cate=$cate_info;
        }
        $cate=new  Cate();
        $cate_ids=$cate->getchilrenid($cate_info["id"]);
        $soncates=$this->getSonCates($cur_top_cate["id"]);
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $cases = db("pack_case")
            ->field("id,customer_name,title,cover_image")
            ->where("cate_id in ({$cate_ids})")
            ->order("id desc")
            ->limit($offset,$length)
            ->order("sort asc")
            ->select();
        $slides = db("advertisement")->where(["type" => 0])->select();
        $this->assign(
            [
                "title"=>$cate_info["title"],
                "keywords"=>$cate_info["keywords"],
                "description"=>$cate_info["desc"],
                "cur_top_cate"=>$cur_top_cate,
                "cur_cate_info"=>$cate_info,
                "cur_second_cates"=>$soncates,
                "slides" => $slides,
                "cases"=>$cases,
            ]
        );
        return view("list");
    }

    public function detail($id){
        $case_detail=db("pack_case")->find($id);
        $cate_id=$case_detail["cate_id"];
        $cate_info=db("cate")->find($cate_id);
        $next_case=db("pack_case")->where(["cate_id"=>$cate_id,"id"=>["gt",$id]])->find();
        $pre_case=db("pack_case")->where(["cate_id"=>$cate_id,"id"=>["lt",$id]])->find();
        if($cate_info["pid"]!=0&&$cate_info["pid"]!=119){
            $cur_top_cate=db("cate")->find($cate_info["pid"]);
        }else{
            $cur_top_cate=$cate_info;
        }
        $soncates=$this->getSonCates($cur_top_cate["id"]);
        $images=db("images")->where(["case_id"=>$id])->select();
        $this->assign(array(
            "title"=>$case_detail["title"],
            "keywords"=>$case_detail["keywords"],
            "description"=>$case_detail["description"],
            "pre_case"=>$pre_case,
            "next_case"=>$next_case,
            "case_detail"=>$case_detail,
            "cur_top_cate"=>$cur_top_cate,
            "cur_second_cates"=>$soncates,
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
        $related_cases=db("pack_case")
            ->field("id,customer_name,title,cover_image")
            ->where($related_map)
            ->limit(6)
            ->order("sort asc")
            ->select();
        return $related_cases;
    }
}