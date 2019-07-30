<?php
namespace app\index\controller;

use think\Request;

class News extends Common
{
    public function _initialize()
    {
        parent::_initialize();
        $this->list_page_size=30;
        $banner_pc=db("advertisement")->where(["type"=>6])->find();
        $banner_m=db("advertisement")->where(["type"=>7])->find();
        $this->assign(array(
            "banner_pc"=>$banner_pc,
            "banner_m"=>$banner_m,
        ));
    }

    public function index(){
        $banner_bottom=db("advertisement")->where(["type"=>8])->find();
        $cate_info=db("cate")->where(["id"=>272])->find();
        $news_cates=db("cate")->where(["pid"=>272])->select();
        $news_list_groups=[];
        $index=0;
        foreach ($news_cates as  $news_cate){
            $index++;
            $arclist=db("article")->field("id,title,desc,thumbnail,time")->where(["cate_id"=>$news_cate["id"]])->limit(16)->select();
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
        $this->assign(array(
            "title"=>$cate_info["title"],
            "keywords"=>$cate_info["keywords"],
            "description"=>$cate_info["desc"],
            "news_list_groups"=>$news_list_groups,
            "nav_index"=>4,
            "banner_bottom"=>$banner_bottom
        ));
        return view("news/index");
    }
    public function conceptLst($page=1)
    {
        $cate_info=db("cate")->where(["id"=>273])->find();
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $articles=db("article")
                  ->where(["cate_id"=>273])
                  ->order("time desc")
                  ->paginate($this->list_page_size);
        $this->assign(array(
            "title"=>$cate_info["title"],
            "keywords"=>$cate_info["keywords"],
            "description"=>$cate_info["desc"],
            "articles"=>$articles,
            "nav_index"=>4
        ));
        return view("news/artlist");
    }

    public function pointLst($page=1)
    {
        $cate_info=db("cate")->where(["id"=>274])->find();
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $articles=db("article")
            ->where(["cate_id"=>274])
            ->order("time desc")
            ->paginate($this->list_page_size);
        $this->assign(array(
            "title"=>$cate_info["title"],
            "keywords"=>$cate_info["keywords"],
            "description"=>$cate_info["desc"],
            "articles"=>$articles,
            "nav_index"=>4
        ));
        return view("news/artlist");
    }

    public function dynamicList($page=1)
    {
        $cate_info=db("cate")->where(["id"=>275])->find();
        $offset=($page-1)*$this->list_page_size;
        $length=$this->list_page_size;
        $articles=db("article")
            ->where(["cate_id"=>275])
            ->order("time desc")
            ->paginate($this->list_page_size);
        $this->assign(array(
            "title"=>$cate_info["title"],
            "keywords"=>$cate_info["keywords"],
            "description"=>$cate_info["desc"],
            "articles"=>$articles,
            "nav_index"=>4
        ));
        return view("news/artlist");
    }

    public function detail($id)
    {
        $article=db("article")->find($id);
        $cate_id=$article["cate_id"];
        $next_id=db("article")->where(["cate_id"=>$cate_id,"id"=>["gt",$id]])->min("id");
        $pre_id=db("article")->where(["cate_id"=>$cate_id,"id"=>["lt",$id]])->max("id");
        $newest_articles=db("article")->where(["cate_id"=>$cate_id])->limit(3)->select();
        $this->assign(array(
            "title"=>$article["title"],
            "keywords"=>$article["keywords"],
            "description"=>$article["desc"],
            "next_id"=>$next_id,
            "pre_id"=>$pre_id,
            "article"=>$article,
            "newest_articles"=>$newest_articles,
            "nav_index"=>4
        ));
        return view("news/article");
    }

}
