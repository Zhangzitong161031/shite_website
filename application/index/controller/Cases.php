<?php

namespace app\index\controller;

use app\index\model\Cate;
use think\exception\Handle;
class Cases extends Common
{
    public function _initialize()
    {
        parent::_initialize();
        $this->case_top_cates=db("cate")->where(["pid"=>119])->order("sort asc")->select();
        $this->list_page_size=12;
    }
  
    public function lst($url_prefix="",$industry_type_id=0,$page=1){
        $cate_info=db("cate")->where(["url_prefix"=>$url_prefix])->find();
        if (!$cate_info){
            throw new \think\exception\HttpException(404);
        }
        $pc_slides=db("advertisement")->where(["type"=>0])->order("sort asc")->select();
        $mobile_slides=db("advertisement")->where(["type"=>1])->order("sort asc")->select();
        $industry_types=db("industry_type")->select();
        if($cate_info["pid"]!=119&&$cate_info["id"]!=119){
            $cur_top_cate=db("cate")->find($cate_info["pid"]);
        }else{
            $cur_top_cate=$cate_info;
        }
        $cate=new  Cate();
        $cate_ids=$cate->getchilrenid($cate_info["id"]);
        $soncates=$this->getSonCates($cur_top_cate["id"]);
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $where=$industry_type_id!=0?"cate_id in ({$cate_ids}) and  industry_type_id={$industry_type_id}":"cate_id in ({$cate_ids})";
        $cases = db("brand_case")
            ->field("id,customer_name,title,cover_image")
            ->where($where)
            ->order("id desc")
            ->limit($offset,$length)
            ->order("sort asc")
            ->select();
        $slides = db("advertisement")->where(["type" => 0])->order("sort asc")->select();
         $this->assign(
            [
                "title"=>$cate_info["title"],
                "keywords"=>$cate_info["keywords"],
                "description"=>$cate_info["desc"],
                "industry_types"=>$industry_types,
                "case_top_cates"=>$this->case_top_cates,
                "cur_top_cate"=>$cur_top_cate,
                "cur_cate_info"=>$cate_info,
                "cur_second_cates"=>$soncates,
                "slides" => $slides,
                "cases"=>$cases,
                "cur_industry_type_id"=>$industry_type_id,
                "nav_index"=>3,
                "pc_slides"=>$pc_slides,
                "mobile_slides"=>$mobile_slides,
             ]
         );
        return view("list");
    }
    public function detail($id){
        $case_detail=db("brand_case")->find($id);
        $cate_id=$case_detail["cate_id"];
        $cate_info=db("cate")->find($cate_id);
        if ($cate_info['pid']==120){
            $pc_slides=db("advertisement")->where(["type"=>2])->order("sort asc")->select();
            $mobile_slides=db("advertisement")->where(["type"=>3])->order("sort asc")->select();
        }else{
            $pc_slides=db("advertisement")->where(["type"=>0])->order("sort asc")->select();
            $mobile_slides=db("advertisement")->where(["type"=>1])->order("sort asc")->select();
        }
        if($cate_info["pid"]!=0&&$cate_info["pid"]!=119){
            $cur_top_cate=db("cate")->find($cate_info["pid"]);
        }else{
            $cur_top_cate=$cate_info;
        }
        $soncates=$this->getSonCates($cur_top_cate["id"]);
        $next_id=db("brand_case")->where(["cate_id"=>$cate_id,"id"=>["gt",$id]])->min("id");
        $pre_id=db("brand_case")->where(["cate_id"=>$cate_id,"id"=>["lt",$id]])->max("id");
        $images=db("images")->where(["case_id"=>$id])->select();
        $this->assign(array(
            "title"=>$case_detail["title"],
            "keywords"=>$case_detail["keywords"],
            "description"=>$case_detail["description"],
            "case_top_cates"=>$this->case_top_cates,
            "cur_second_cates"=>$soncates,
            "cur_top_cate"=>$cur_top_cate,
            "cur_cate_info"=>$cate_info,
            "next_id"=>$next_id,
            "pre_id"=>$pre_id,
            "case_detail"=>$case_detail,
            "related_cases"=>$this->getRelatedCases($case_detail),
            "nav_index"=>3,
            "pc_slides"=>$pc_slides,
            "mobile_slides"=>$mobile_slides,
            "images"=>$images
        ));
        return view("detail");
    }

    public function getRelatedCases($case_detail){
        $related_map=array(
            "Industry_type_id"=>$case_detail["Industry_type_id"],
            "cate_id"=>$case_detail["cate_id"],
            "id"=>["neq",$case_detail["id"]]
        );
        $related_cases=db("brand_case")
            ->field("id,customer_name,title,cover_image")
            ->where($related_map)
            ->limit(6)
            ->order("sort asc")
            ->select();
        return $related_cases;
    }

    public function caseDetail($type){
        $id=input("id");
        $db_name="{$type}_case";
        $slides = db("advertisement")->where(["type" => 0])->order("sort asc")->select();
        $second_case_cates = $this->getSecondCaseCates($type);
        $case_detail=db($db_name)->where(["id"=>$id])->find();
        $next_id=db($db_name)->where("id > {$id}")->min("id");
        $pre_id=db($db_name)->where("id < {$id}")->max("id");
        $related_map=array(
            "Industry_type_id"=>$case_detail["Industry_type_id"],
            "cate_id"=>$case_detail["cate_id"],
        );
        $related_cases=db($db_name)->where($related_map)->order("sort asc")->select();
        $this->assign(array(
            "slides" => $slides,
            "types"=>$this->TopCaseTypes,
            "second_case_cates"=>$second_case_cates,
            "cur_type"=>$type,
            "next_id"=>$next_id,
            "pre_id"=>$pre_id,
            "case_detail"=>$case_detail,
            "related_cases"=>$related_cases,
        ));
    }

    public function caseList($type,$page)
    {
        $cate_id=$this->TopCaseCateMaps[$type];
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $cases = db("brand_case")
            ->field("id,customer_name,title,cover_image")
            ->where(["cate_id"=>$cate_id])
            ->order("sort asc")
            ->limit($offset,$length)
            ->select();
        $pid=$this->TopCaseCateMaps[$type];
        $son_ids=db("cate")->where(["pid"=>$pid])->column("id");
        $ids=$son_ids;
        $ids[]=$pid;
        $second_case_cates = $this->getSecondCaseCates($type);
        $slides = db("advertisement")->where(["type" => 0])->select();
        $cases = db("brand_case")
                ->field("id,customer_name,title,cover_image")
                ->where(["cate_id"=>$cate_id])
                ->order("sort asc")
                ->limit($offset,$length)
                ->select();
        $this->assign(
            [
                "types"=>$this->TopCaseTypes,
                "cur_type"=>$type,
                "second_case_cates"=>$second_case_cates,
                "slides" => $slides,
                "cases"=>$cases,
            ]
        );
    }

    public function getSonCates($pid){
        $sonCates = db("cate")->where(["pid" => $pid])->field("id,catename,url_prefix")->select();
        return $sonCates;
    }
    public function brandList($page=1)
    {
        $this->caseList($type="brand",$page);
        return view("list");
    }

    public function brandDetail()
    {
        $this->caseDetail($type="brand");
        return view("detail");
    }

    public function packDetail()
    {
        $this->caseDetail($type="pack");
        return view("detail");
    }

    public function pptDetail()
    {
        $this->caseDetail($type="ppt");
        return view("detail");
    }
}