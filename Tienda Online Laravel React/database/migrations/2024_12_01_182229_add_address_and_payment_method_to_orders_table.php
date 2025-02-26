<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('address')->nullable()->after('user_id');
            $table->string('payment_method')->nullable()->after('address');
            $table->string('phone')->nullable()->after('payment_method');
            $table->string('email')->nullable()->after('phone');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['address', 'payment_method', 'phone', 'email']);
        });
    }
};
