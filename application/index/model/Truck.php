<?php
namespace app\index\model;
use think\Model;

class Truck  extends Model
{
    public function getAllTrucks($cateid){
        $cate=new Cate();
        $allCateID=$cate->getchilrenid($cateid);
        $trucks=db('truck')->where("cate_id IN($allCateID)")->order('id desc')->paginate(12);
        return $trucks;
    }

    public function getRecTruck(){
        $recTruck=$this->where('rec','=',1)->field('id,title,thumb')->order('id desc')->limit(4)->select();
        return $recTruck;
    }
}
