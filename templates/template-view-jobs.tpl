<div class="page-title">{{template.title}}</div>
{{#if_true hasJobs}}
	<div class="page-tools">
		<button id="add-job" class="primary">Add New Job</button>
	</div>
	<ul class="grid-list"></ul>
{{else}}
	<div class="empty-page">
		Looks like You don't have any Job Postings. Tap on the 'Add New Job' button to get started.<br/>
		<button class="primary">Add New Job</button>
	</div>
{{/if_true}}