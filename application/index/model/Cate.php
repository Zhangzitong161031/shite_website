<?php
namespace app\index\model;
use think\Model;
class Cate extends Model
{
    public function getchilrenid($cateid){
        $cateres=$this->select();
        $arr=$this->_getchilrenid($cateres,$cateid);
        $arr[]=$cateid;
        $strId=implode(',', $arr);
        return $strId;
    }

    public function _getchilrenid($cateres,$cateid){
        static $arr=array();
        foreach ($cateres as $k => $v) {
            if($v['pid'] == $cateid){
                $arr[]=$v['id'];
                $this->_getchilrenid($cateres,$v['id']);
            }
        }
        return $arr;
    }


    public function getparents($cateid){
        $cateres=$this->field('id,pid,catename')->select();
        $cate=db('cate')->field('id,pid,catename')->find($cateid);
        $pid=$cate['pid'];
        if($pid!=0){
            $arr=$this->_getparentsid($cateres,$pid);
        }
        $arr[]=$cate;

        return $arr;
    }

    public function _getparentsid($cateres,$pid){
        static $arr=array();
        foreach ($cateres as $k => $v) {
            if($v['id'] == $pid){
                array_unshift($arr,$v);
                $this->_getparentsid($cateres,$v['pid']);
            }
        }
        return $arr;
    }

    public function getRecIndex(){
        $recIndex=$this->order('id desc')->where('rec_index','=',1)->select();
        return $recIndex;
    }

    public function getRecBottom(){
        $RecBottom=$this->order('id desc')->where('rec_bottom','=',1)->select();
        return $RecBottom;
    }

    public function getCateInfo($cateid){
        $cateInfo=$this->find($cateid);
        return $cateInfo;
    }

    public function cateTree($pid=0){
        $cateres=$this->order('sort asc')->select();
        return $this->sort($cateres,$pid);
    }

    public function sort($data,$pid=0,$level=0){
        static $arr=array();
        foreach ($data as $k => $v) {
            if($v['pid']==$pid){
                $v['level']=$level;
                $arr[]=$v;
                $this->sort($data,$v['id'],$level+1);
            }
        }
        return $arr;
    }


}
