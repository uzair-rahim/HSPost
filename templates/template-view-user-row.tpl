<input type="checkbox" class="user-select"/>
<!-- Profile Picture -->
<div class="column user-picture">
	{{#if_not_null user.photo}}
		<img src="{{user.photo.url}}"/>
	{{/if_not_null}}
</div>
<!-- User Info -->
<div class="column user-info">
	<div class="name">{{user.firstname}} {{user.lastname}}</div>
	<div class="job">{{user.primaryWorkHistory.jobs.[0].jobName}} @ {{user.primaryWorkHistory.employer.name}}</div>
</div>
<!-- More -->
<div class="column more"></div>