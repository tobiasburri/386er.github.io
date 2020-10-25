var addressTemplate =`

<div class="container" style="margin:auto;width:500px;">
	<div class="row">
		 <form class="form-horizontal">
            <fieldset style="width:500px; border:1px solid white">
                <!-- Address form -->

                <h2 style="margin-bottom:60px">Contact & Shipping</h2>

                <!-- Email input-->
                <div class="control-group">
                    <label class="control-label">Email</label>
                    <div class="controls">
                        <input id="email" name="email" type="text" placeholder="email"
                        class="input-xlarge">
                    </div>
                </div>
                <p></p>

                <!-- name input-->
                <div class="control-group">
                    <label class="control-label">First name</label>
                    <label class="control-label" style="margin-left:178px;">Last name</label>
                    <div class="controls">
                        <input id="first-name" name="first-name" type="text" placeholder="first name"
                        class="input-xsmall">
                        <input id="last-name" name="last-name" type="text" placeholder="last name"
                        class="input-xsmall">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- street input-->
                <div class="control-group">
                    <label class="control-label">Street and house number</label>
                    <div class="controls">
                        <input id="street" name="street" type="text" placeholder="street and house number"
                        class="input-xlarge">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- postal-code input-->
                <div class="control-group">
                    <label class="control-label">Zip / Postal Code</label>
                    <label class="control-label"  style="margin-left:137px;">City</label>
                    <div class="controls">
                        <input id="postal-code" name="postal-code" type="text" placeholder="zip or postal code"
                        class="input-xsmall">
                        <input id="city" name="city" type="text" placeholder="city"
                        class="input-xsmall">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- region input-->
                <div class="control-group">
                    <label class="control-label">State / Province / Region</label>
                    <div class="controls">
                        <input id="region" name="region" type="text" placeholder="state / province / region"
                        class="input-xlarge">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- country select -->
                <div class="control-group">
                    <label class="control-label">Country</label>
                    <div class="controls">
                        <select id="country" name="country" class="input-xlarge">
                            <option value="" selected="selected">(please select a country)</option>
                            <option value="DE">Germany</option>
                        </select>
                    </div>
                </div>
            </fieldset>
        </form>
	</div>
</div>

<div class="size-move-card" style="margin-right:130px;">

		<p style="text-align:center"> proceed</p>

</div>

<div id="back">

    <p class="backp" onclick="" style="text-align: center; width:60px;padding:5px; position:relative;top:103; margin:auto;cursor: pointer;"> back </p>

</div>
	
`;