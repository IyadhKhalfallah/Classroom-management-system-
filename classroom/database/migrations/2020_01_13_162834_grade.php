<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Grade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grade', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('ds')->default(0);
            $table->double('tp')->nullable();
            $table->double('exam')->default(0);
            $table->double('average');

            $table->bigInteger('subject_id')->unsigned();
            $table->foreign('subject_id')
                ->references('id')->on('subject')
                ->onDelete('cascade');

            $table->bigInteger('users_id')->unsigned();
            $table->foreign('users_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
