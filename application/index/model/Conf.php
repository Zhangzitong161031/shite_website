<?php
namespace app\index\model;
use think\Model;
class Conf  extends Model
{
    public function getAllConf(){
    	$confres=$this::field('enname,cnname,value')->select();
    	return $confres;
    }
}
