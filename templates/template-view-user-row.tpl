{{#if_true user.selectable}}
<input type="checkbox" class="user-select"/>
{{/if_true}}
<!-- Profile Picture -->
<div class="column user-picture">
	{{#if_not_null user.photo}}
		<img src="{{user.photo.url}}"/>
	{{/if_not_null}}
</div>
<!-- User Info -->
<div class="column user-info">
	<div class="name">{{user.firstname}} {{user.lastname}}</div>
	<div class="job">
	{{#if_not_null user.primaryWorkHistory}}
		{{user.primaryWorkHistory.jobs.[0].jobName}} @ {{user.primaryWorkHistory.employer.name}}
	{{else}}
		<span>No Experience</span>
	{{/if_not_null}}	
	</div>
</div>
<!-- More -->
<div class="column more"></div>
<!-- Connections -->
{{#if_not_eq user.sharedNetworkConnectionCount undefined}}
	{{#if_gt user.sharedNetworkConnectionCount 0}}
		<div class="column connections data">{{user.sharedNetworkConnectionCount}}</div>
	{{else}}
		<div class="column connections">{{user.sharedNetworkConnectionCount}}</div>
	{{/if_gt}}
{{/if_not_eq}}
<!-- Endorsements -->
{{#if_not_eq user.endorsementCount undefined}}
	{{#if_gt user.endorsementCount 0}}
		<div class="column endorsements data">{{user.endorsementCount}}</div>
	{{else}}
		<div class="column endorsements">{{user.endorsementCount}}</div>
	{{/if_gt}}
{{/if_not_eq}}

