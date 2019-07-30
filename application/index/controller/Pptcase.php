<?php
namespace app\pack\controller;

use think\Controller;
class Pptcase extends Controller
{
    public function Lst($id=1){
        $this->assign("id",$id);
        return view();
    }

    public function Detail(){
        $this->assign("id",input("id"));
        return view();
    }
}