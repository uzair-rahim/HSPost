<div class="admin-info">
	<div class="employer-logo">
		{{#if_not_eq user.employers.[0].logo undefined}}
			<img src="{{user.employers.[0].logo}}"/>
		{{/if_not_eq}}
	</div>
	<div class="user-name">{{user.firstname}} {{user.lastname}}</div>
	<div class="employer-name {{#if_not_eq user.employers.length 1}}more{{/if_not_eq}}">{{user.employers.[0].name}}</div>
</div>
<ul class="menu-list">
	<li id="menu-notifications">
		<label>Notifications</label>
	</li>
	<li class="divider"></li>
	<li id="menu-jobs">
		<label>Jobs</label>
	</li>
	<li id="menu-candidates">
		<label>Candidates</label>
	</li>
	<li id="menu-network">
		<label>Network</label>
	</li>
	<li id="menu-messages">
		<label>Messages</label>
	</li>
	<li class="divider"></li>
	<li id="menu-settings">
		<label>Settings</label>
	</li>
	<li id="menu-logout">
		<label>Logout</label>
	</li>
	<li class="divider"></li>
</ul>