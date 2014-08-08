<div class="admin-info">
	<div class="employer-logo">
		{{#if_not_null user.employers.[0].logo}}
			<img src="{{user.employers.[0].logo}}"/>
		{{/if_not_null}}
	</div>
	<div class="user-name">{{user.firstname}} {{user.lastname}}</div>
	<div class="employer-name {{#if_not_eq user.employers.length 1}}more{{/if_not_eq}}">{{user.employers.[0].name}}</div>
</div>
<ul class="menu-list">
	<li id="menu-jobs">Jobs</li>
	<li id="menu-candidates">Candidates</li>
	<li id="menu-network">Network</li>
	<li class="divider"></li>
	<li id="menu-settings">Settings</li>
	<li class="divider"></li>
	<li id="menu-logout">Logout</li>
	<li class="divider"></li>
</ul>