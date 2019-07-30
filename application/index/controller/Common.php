<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\Cate as CateModel;
class Common extends Controller
{

    public function _initialize(){
        $this->configs=$this->getConfigs();
        $links=db("link")->select();
        $this->assign("links",$links);
    }
    public function getNavCates(){
        $cateres=db('cate')->where(array('pid'=>0))->select();
        foreach ($cateres as $k => $v) {
            $children=db('cate')->where(array('pid'=>$v['id']))->select();
            if($children){
                $cateres[$k]['children']=$children;
            }else{
                $cateres[$k]['children']=0;
            }
        }
        $this->assign('cateres',$cateres);
    }

    public function getConfigs(){
        $conf=new \app\index\model\Conf();
        $_configs=$conf->getAllConf();
        $configs=array();
        foreach ($_configs as $k => $v) {
            $configs[$v['enname']]=$v['value'];
        }
        return $configs;
    }
    public function getPos($cateid){
        $cate= new \app\index\model\Cate();
        $posArr=$cate->getparents($cateid);
        $this->assign('posArr',$posArr);
    }
}
