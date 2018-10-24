<?php
$this->title = Yii::t('app','Settings');
use \common\models\NotificationsSettings;
?>

<div class="wrap">
    <main class="aside_visible main__settings">
        <section class=" main__section main__settings__content ">
            <section class="main__section__item main__settings__content__item main__settings__content__item__wrap">
                <section class=" main__settings__content__item__wrap__item main__settings__content__item__wrap__item_account">
                    <h3><?=Yii::t('app', 'Account')?></h3>
                    <?php
                    \yii\widgets\Pjax::begin();
                    $form = \yii\widgets\ActiveForm::begin(['options'=>['class'=>'main__settings__content__wrap__item__form main__settings__content__item__wrap__item_account__form','data-pjax'=>true],'enableClientValidation'=>true]);
                    ?>
                        <?= $form->field($accountModel, 'firstname',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                            ->input('text',['class'=>''])->label(false);
                        ?>

                        <?= $form->field($accountModel, 'lastname',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                            ->input('text',['class'=>''])->label(false);
                        ?>

                        <?= $form->field($accountModel, 'phone',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                            ->input('text',['class'=>''])->label(false);
                        ?>

                        <?= $form->field($accountModel, 'email',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                            ->input('text',['class'=>''])->label(false);
                        ?>


                        <div class="main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item">
                            <div class="error_msg">
                                <div class="error_msg__verificate haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_small <?=$accountModel->email_check?'checked':'';?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" <?=$accountModel->email_check?'checked':'';?>>
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Email verified')?>
                                    </span>
                                </div>
                                <?php if(!$accountModel->email_check){?>
                                <div class="error_msg__text">
                                   <a href="<?=\yii\helpers\Url::toRoute(['cabinet/sendverify'])?>"><?=Yii::t('app', 'Resend verification email')?></a>
                                </div>
                                <?php }?>
                            </div>
                        </div>
                        <button type="submit" class="btn btn_big btn_big_gradient"><?=Yii::t('app', 'Save')?></button>

                        <?php if(Yii::$app->session->hasFlash('account_success')){
                            $mess = Yii::$app->session->getFlash('account_success');
                            ?>
                                <div class="main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item field-accountform-phone required has-success">
                                        <div class="help-block"><?=$mess?></div>
                                </div>
                                <script>
                                    var errorObj = {
                                        type: success,
                                        message: '<?=$mess?>'
                                    };
                                    showPopup(errorObj);
                                </script>
                        <?php }?>

                    <?php $form->end();?>
                    <?php  \yii\widgets\Pjax::end(); ?>
                </section>
                <section class=" main__settings__content__item__wrap__item main__settings__content__item__wrap__item_password">
                    <h3><?=Yii::t('app', 'Change password')?></h3>
                    <?php
                    \yii\widgets\Pjax::begin();
                    $form = \yii\widgets\ActiveForm::begin(['options'=>['class'=>'main__settings__content__item__wrap__item__form main__settings__content__item__wrap__item_password__form','data-pjax'=>true],'enableClientValidation'=>true]);
                    ?>

                    <?= $form->field($passwordModel, 'oldpassword',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                        ->input('password',['class'=>'','placeholder'=>$passwordModel->getAttributeLabel('oldpassword')])->label(false);
                    ?>

                    <?= $form->field($passwordModel, 'password',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                        ->input('password',['class'=>'','placeholder'=>$passwordModel->getAttributeLabel('password')])->label(false);
                    ?>

                    <?= $form->field($passwordModel, 'passwordcheck',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                        ->input('password',['class'=>'','placeholder'=>$passwordModel->getAttributeLabel('passwordcheck')])->label(false);
                    ?>


                    <button type="submit" class="btn btn_big btn_big_gradient"><?=Yii::t('app', 'Save')?></button>

                        <?php if($mess = Yii::$app->session->getFlash('password_success')){
                            ?>
                                <div class="main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item field-accountform-phone required has-success">
                                        <div class="help-block"><?=$mess?></div>
                                </div>
                                <script>
                                    var errorObj = {
                                        type: success,
                                        message: '<?=$mess?>'
                                    };
                                    showPopup(errorObj);
                                </script>
                        <?php }?>

                    <?php $form->end();?>
                    <?php  \yii\widgets\Pjax::end(); ?>
                </section>
            </section>
            <section class="main__section__item main__settings__content__item main__settings__content__item_security security">
                <section class="main__settings__content__item__wrap__item security__content">
                    <h3><?=Yii::t('app', 'Security')?></h3>
                    <section class="security__content__item security__content__item_auth">
                        <h4 class="haveCheckbox">
                            <div>
                                <div class="fakeCheckbox_off fakeCheckbox_big <?=$user->twoauth?'checked':''?>" id="2auth_checkbox_block"></div>
                                <input type="checkbox" class="hiddenCheckbox" name="" id="2auth_checkbox">
                            </div>
                            <span>
                                <?=Yii::t('app', 'Two-factor autentification')?>

                            </span>
                        </h4>

                        <div class="img_text">
                            <img src="<?=$qrlink?>" />
                            <span>
                                <?=Yii::t('app', 'Download Google authenticator and scan the QR code for synchronization.')?>
                                <?=Yii::t('app', 'Only after synchronization with the device, enable two-factor authentication.')?>
                            </span>
                        </div>
                    </section>
                    <section class="security__content__item security__content__item_white_list">
                        <h4 class="haveCheckbox">
                            <div>
                                <div class="fakeCheckbox_off fakeCheckbox_big <?=$user->ipwhitelist?'checked':''?>" id="ipwhitelist_checkbox_block"></div>
                                <input type="checkbox" class="hiddenCheckbox" name="" id="ipwhitelist_checkbox">
                            </div>
                            <span>
                                <?=Yii::t('app', 'White list')?>
                            </span>
                        </h4>
                        <div class="white_list" id="white_list">
                            <?php
                            \yii\widgets\Pjax::begin();
                            $form = \yii\widgets\ActiveForm::begin(['options'=>['data-pjax'=>true],'enableClientValidation'=>false]);
                            ?>


                            <div class="white_list__left main__settings__content__item__wrap__item__form__item">
                                <?= $form->field($ipwhitelistModel, 'ip',['options'=>['class'=>'main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item']])
                                    ->input('text',['placeholder'=>Yii::t('app', 'Enter IP address')])->label(false);
                                ?>
                                <button type="submit" class="btn btn_small btn_small_gradient">Add</button>

                                <?php if(Yii::$app->session->hasFlash('ipwhitelist_success')){
                                    $mess = Yii::$app->session->getFlash('ipwhitelist_success');
                                    ?>
                                        <div class="main__settings__content__item__wrap__item__form__item main__settings__content__item__wrap__item_account__form__item field-accountform-phone required has-success">
                                                <div class="help-block"><?=$mess?></div>
                                        </div>
                                        <script>
                                            var errorObj = {
                                                type: success,
                                                message: '<?=$mess?>'
                                            };
                                            showPopup(errorObj);
                                        </script>
                                <?php }?>

                            </div>
                            <div class="white_list__right">
                                <a class="save_ip">
                                    <span><?=Yii::t('app', 'IPs list')?></span>

                                    <svg width="6px" height="2px" viewBox="0 0 6 2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <defs></defs>
                                        <g id="dashboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="setting" transform="translate(-898.000000, -431.000000)" stroke="#00D1FF">
                                                <g id="back" transform="translate(901.000000, 432.000000) rotate(-90.000000) translate(-901.000000, -432.000000) translate(900.000000, 430.000000)">
                                                    <path d="M2,0 L0,2" id="Line"></path>
                                                    <path d="M0,2 L2,4" id="Line"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                <ul class="white_list__right__list">
                                    <?php if($ipwhitelistModel->userips){
                                        foreach ($ipwhitelistModel->userips as $ip){?>
                                        <li class="white_list__right__list__item">
                                            <div>
                                                <span><?=$ip->ip?></span>
                                                <a class="deleteItem delete_ip"  data-id="<?=$ip->id?>">

                                                    <svg width="6px" height="6px" viewBox="0 0 19 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <defs></defs>
                                                        <g id="dashboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <g id="setting" transform="translate(-43.000000, -41.000000)" fill="#4A4A4A">
                                                                <g id="menu">
                                                                    <g id="Menu" transform="translate(43.000000, 41.000000)">
                                                                        <path d="M-1.54440959,8.38375162 L20.8590523,8.38375162 C21.3177747,8.38375162 21.6896427,8.75561961 21.6896427,9.21434203 L21.6896427,9.21434203 C21.6896427,9.67306445 21.3177747,10.0449324 20.8590523,10.0449324 L-1.54440959,10.0449324 C-2.00313201,10.0449324 -2.375,9.67306445 -2.375,9.21434203 L-2.375,9.21434203 C-2.375,8.75561961 -2.00313201,8.38375162 -1.54440959,8.38375162 Z"
                                                                            id="Rectangle" transform="translate(9.657321, 9.214342) rotate(-315.000000) translate(-9.657321, -9.214342) "></path>
                                                                        <path d="M-1.54440959,8.38375162 L20.8590523,8.38375162 C21.3177747,8.38375162 21.6896427,8.75561961 21.6896427,9.21434203 L21.6896427,9.21434203 C21.6896427,9.67306445 21.3177747,10.0449324 20.8590523,10.0449324 L-1.54440959,10.0449324 C-2.00313201,10.0449324 -2.375,9.67306445 -2.375,9.21434203 L-2.375,9.21434203 C-2.375,8.75561961 -2.00313201,8.38375162 -1.54440959,8.38375162 Z"
                                                                            id="Rectangle" transform="translate(9.657321, 9.214342) rotate(-45.000000) translate(-9.657321, -9.214342) "></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </div>
                                        </li>
                                    <?php  }
                                    }?>
                                </ul>
                            </div>


                            <?php $form->end();?>
                            <?php  \yii\widgets\Pjax::end(); ?>
                        </div>
                    </section>
                    <section class="security__content__item security__content__item_login_history login_history">
                        <h4 class=""><?=Yii::t('app', 'Login history')?></h4>
                        <table class="main__table login_history__table">
                            <tbody>
                                <tr class="main__table__head_row">
                                    <th>
                                        <a  class=""> <span><?=Yii::t('app', 'Browser/OS')?></span>  </a>
                                    </th>
                                    <th>
                                        <a  class="">  <span><?=Yii::t('app', 'Login time & date')?></span> </a>
                                    </th>
                                    <th>
                                        <a  class=""> <span><?=Yii::t('app', 'IP address')?></span> </a>
                                    </th>
                                </tr>
                                <?php
                                if($loginhistory){
                                    foreach ($loginhistory as $lh){
                                ?>
                                    <tr>
                                        <td><?=$lh->browser?></td>
                                        <td><?=date('d.m.Y',$lh->created_at)?></td>
                                        <td><?=$lh->ip?></td>
                                    </tr>
                                <?php }
                                }?>
                            </tbody>
                        </table>
                    </section>
                </section>
            </section>
            <section class="main__section__item main__settings__content__item main__settings__content__item_notification notification">
                <section class=" main__settings__content__item__wrap__item notification__content">
                    <h3><?=Yii::t('app', 'Notification')?></h3>
                    <section class="notification__content__item">
                        <h5><?=Yii::t('app', 'Email')?></h5>
                        <ul class="notification__content__item__list">
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_PAYRECIVE,NotificationsSettings::TYPESEND_EMAIL)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_PAYRECIVE?>" data-sendtype="<?=NotificationsSettings::TYPESEND_EMAIL?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email when payment had been received')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_WITHDRAWAL,NotificationsSettings::TYPESEND_EMAIL)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_WITHDRAWAL?>" data-sendtype="<?=NotificationsSettings::TYPESEND_EMAIL?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email after withdraws')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_NEWS,NotificationsSettings::TYPESEND_EMAIL)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_NEWS?>" data-sendtype="<?=NotificationsSettings::TYPESEND_EMAIL?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email with news about system')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_SETTINGS,NotificationsSettings::TYPESEND_EMAIL)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_SETTINGS?>" data-sendtype="<?=NotificationsSettings::TYPESEND_EMAIL?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email when system settings were changed')?>
                                    </span>
                                </div>
                            </li>
                        </ul>

                    </section>
                    <?php if($user->packet==\common\models\User::PACKET_PROFESSIONAL){?>
                    <section class="notification__content__item">
                        <h5><?=Yii::t('app', '')?>SMS</h5>
                        <ul class="notification__content__item__list">
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_PAYRECIVE,NotificationsSettings::TYPESEND_SMS)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_PAYRECIVE?>" data-sendtype="<?=NotificationsSettings::TYPESEND_SMS?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email when payment had been received')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_WITHDRAWAL,NotificationsSettings::TYPESEND_SMS)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_WITHDRAWAL?>" data-sendtype="<?=NotificationsSettings::TYPESEND_SMS?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email after withdraws')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_NEWS,NotificationsSettings::TYPESEND_SMS)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_NEWS?>" data-sendtype="<?=NotificationsSettings::TYPESEND_SMS?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email with news about system')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item">
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off fakeCheckbox_big notifications_trigger <?=$user->checknotify(NotificationsSettings::TYPE_SETTINGS,NotificationsSettings::TYPESEND_SMS)?'checked':''?>"  data-type="<?=NotificationsSettings::TYPE_SETTINGS?>" data-sendtype="<?=NotificationsSettings::TYPESEND_SMS?>" ></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        <?=Yii::t('app', 'Sending email when system settings were changed')?>
                                    </span>
                                </div>
                            </li>
                            <li class="notification__content__item__list__item  auto-convert-setting">
                                <form action="">
                                <h5>Auto Convertation</h5>
                                <div class="haveCheckbox">
                                    <div>
                                        <div class="fakeCheckbox_off  fakeCheckbox_big notifications_trigger checked"
                                            data-type="" data-sendtype=""></div>
                                        <input type="checkbox" class="hiddenCheckbox" name="" id="">
                                    </div>
                                    <span>
                                        Auto-convert </span>
                                </div>
                                <div class="custom_select ">
                                    <div data-choosen="USD" data-type="TYPE_USD" class="custom_select__choosen toggleSelect selected">
                                        <span>USD</span>
                                        <div class="showOptions">
                                            <svg width="10px" height="10px" viewBox="0 0 18 8" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs></defs>
                                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="ic_down" transform="translate(-3.000000, -8.000000)" stroke="#4A4A4A">
                                                        <g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) "
                                                            id="ic_back">
                                                            <g>
                                                                <g id="back" transform="translate(8.000000, 4.000000)">
                                                                    <path d="M8,0 L0,8" id="Line"></path>
                                                                    <path d="M0,8 L8,16" id="Line"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="hideOptions">
                                            <svg width="10px" height="10px" viewBox="0 0 19 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs></defs>
                                                <g id="dashboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="store" transform="translate(-43.000000, -41.000000)" fill="#00D1FF">
                                                        <g id="menu">
                                                            <g id="Menu" transform="translate(43.000000, 41.000000)">
                                                                <path d="M-1.54440959,8.38375162 L20.8590523,8.38375162 C21.3177747,8.38375162 21.6896427,8.75561961 21.6896427,9.21434203 L21.6896427,9.21434203 C21.6896427,9.67306445 21.3177747,10.0449324 20.8590523,10.0449324 L-1.54440959,10.0449324 C-2.00313201,10.0449324 -2.375,9.67306445 -2.375,9.21434203 L-2.375,9.21434203 C-2.375,8.75561961 -2.00313201,8.38375162 -1.54440959,8.38375162 Z"
                                                                    id="Rectangle" transform="translate(9.657321, 9.214342) rotate(-315.000000) translate(-9.657321, -9.214342) "></path>
                                                                <path d="M-1.54440959,8.38375162 L20.8590523,8.38375162 C21.3177747,8.38375162 21.6896427,8.75561961 21.6896427,9.21434203 L21.6896427,9.21434203 C21.6896427,9.67306445 21.3177747,10.0449324 20.8590523,10.0449324 L-1.54440959,10.0449324 C-2.00313201,10.0449324 -2.375,9.67306445 -2.375,9.21434203 L-2.375,9.21434203 C-2.375,8.75561961 -2.00313201,8.38375162 -1.54440959,8.38375162 Z"
                                                                    id="Rectangle" transform="translate(9.657321, 9.214342) rotate(-45.000000) translate(-9.657321, -9.214342) "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="custom_select__options">
                                        <div data-currency="USD" data-type="TYPE_USD" class="custom_select__option selectOption">
                                            <span>USD</span>
                                        </div>
                                        <div data-currency="EUR" data-type="TYPE_EUR" class="custom_select__option selectOption">
                                            <span>EUR</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </li>
                        </ul>
                    </section>
                    <?php }?>
                </section>
            </section>
        </section>
    </main>
</div>

<?php

$js = <<<JS
    $('#2auth_checkbox_block').on('click',function(){
    
        var el = $(this);
        $.ajax({
            url : '/cabinet/ajax2auth',
            type : 'post',         
            dataType : "json",
            success: function (data, textStatus) { 
                if(data.success=='ok'){
                    if(data.twoauth){
                        el.addClass('checked');
                    }else{
                        el.removeClass('checked');
                    }
                }else{
                    var errorObj = {
                        type: error,
                        message: 'Activation error'
                    };
                    showPopup(errorObj);
                }
            }               
        }); 
    });
    
    $('#ipwhitelist_checkbox_block').on('click',function(){
    
        var el = $(this);
        $.ajax({
            url : '/cabinet/ajaxipwhitelist',
            type : 'post',         
            dataType : "json",
            success: function (data, textStatus) { 
                if(data.success=='ok'){
                    if(data.ipwhitelist){
                        el.addClass('checked');
                    }else{
                        el.removeClass('checked');
                    }
                }else{
                    var errorObj = {
                        type: error,
                        message: 'Activation error'
                    };
                    showPopup(errorObj);
                    
                }
            }               
        }); 
    });
    
    $('.notifications_trigger').on('click',function(){
    
        var el = $(this);
        var type = el.data('type');
        var sendtype = el.data('sendtype');
        $.ajax({
            url : '/cabinet/ajaxsetnotifications',
            type : 'post',         
            dataType : "json",
            data : {type:type,sendtype:sendtype},
            success: function (data, textStatus) { 
                if(data.success=='ok'){
                    if(data.notify){
                        el.addClass('checked');
                    }else{
                        el.removeClass('checked');
                    }
                }else{
                    var errorObj = {
                        type: error,
                        message: 'Activation error'
                    };
                    showPopup(errorObj);
                }
            }               
        });
    });
    
    $('#white_list').on('click','.delete_ip',function(){
        var el = $(this);
        var id = el.data('id');
        $.ajax({
            url : '/cabinet/ajaxdeleteip',
            type : 'post',         
            dataType : "json",
            data : {id:id},
            success: function (data, textStatus) { 
                if(data.success=='ok'){
                    el.closest('li').remove();
                }else{
                    var errorObj = {
                        type: error,
                        message: 'Deleting error'
                    };
                    showPopup(errorObj);
                }
            }               
        }); 
    });
    
    
    
JS;

$this->registerJs($js);

?>