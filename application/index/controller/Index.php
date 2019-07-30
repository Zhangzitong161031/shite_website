<?php
namespace app\index\controller;

class Index extends Common
{
    public function index()
    {
        $pack_second_cases=db("cate")->where(["type"=>1,"site"=>2,"id"=>["in","141,266,269"]])->order("sort asc")->select();
        $brand_second_cases=db("cate")->where(["type"=>1,"site"=>1,"pid"=>120])->order("sort asc")->select();
        $ppt_second_cases=db("cate")->where(["type"=>1,"site"=>3,"pid"=>["neq",0]])->order("sort asc")->select();
        $pc_slides=db("advertisement")->where(["type"=>0])->order("sort asc")->select();
        $mobile_slides=db("advertisement")->where(["type"=>1])->order("sort asc")->select();
        $this->assign(
            [
                "pack_second_cases"=>$pack_second_cases,
                "brand_second_cases"=>$brand_second_cases,
                "ppt_second_cases"=>$ppt_second_cases,
                "title"=>$this->configs["home_title"],
                "keywords"=>$this->configs["home_keywords"],
                "description"=>$this->configs["home_desc"],
                "pc_slides"=>$pc_slides,
                "mobile_slides"=>$mobile_slides,
                "brand_cases"=>$this->getBrandCases(),
                "pack_cases"=>$this->getPackCases(),
                "ppt_cases"=>$this->getPptCases(),
                "service_groups"=>$this->getServiceGroups(),
                "news_list_groups"=>$this->getNews(),
                "nav_index"=>1
            ]
        );
        return view();
    }

    public function getNews(){
        $news_cates=db("cate")->where(["pid"=>272])->select();
        $news_list_groups=[];
        $index=0;
        foreach ($news_cates as  $news_cate){
            $index++;
            $arclist=db("article")->field("id,title,desc,thumbnail,time")->where(["cate_id"=>$news_cate["id"]])->limit(4)->select();
            $toutiao=$arclist[0];
            unset($arclist[0]);
            $news_list_group=array(
                "cate_url_prefix"=>$news_cate["url_prefix"],
                "cate_name"=>$news_cate["catename"],
                "toutiao"=>$toutiao,
                "arclist"=>$arclist,
            );
            $news_list_groups[]=$news_list_group;
        }
        return $news_list_groups;
    }

    public function getBrandCases(){
        $brand_cases=db("brand_case")
            ->alias("a")
            ->join("bk_cate c","a.cate_id=c.id")
            ->field("a.id,a.customer_name,a.title,a.cover_image")
            ->where(["c.id"=>236])
            ->order("a.sort asc")
            ->limit(12)
            ->select();
        return $brand_cases;
    }

    public function getPackCases(){
        $pack_cases=db("pack_case")
            ->field("id,customer_name,title,cover_image")
            ->where(["show_on_homepage"=>1])
            ->order("sort asc")
            ->limit(12)
            ->select();
        return $pack_cases;
    }

    public function getPptCases(){
        $ppt_cases=db("ppt_case")
            ->field("id,customer_name,title,cover_image")
            ->order("sort asc")
            ->limit(12)
            ->select();
        return $ppt_cases;
    }

    public function getServiceGroups(){
        $top_services=db("footer_services")->field("id,service_name,link")->where(["pid"=>0])->select();
        $service_groups=[];
        foreach ($top_services as $top_service){
            $pid=$top_service["id"];
            $son_services=db("footer_services")->where(["pid"=>$pid])->select();
            $item=array(
                "top_name"=>$top_service["service_name"],
                "top_link"=>$top_service["link"],
                "sonitems"=>$son_services
            );
            $service_groups[]=$item;
        }
        return $service_groups;
    }

}
