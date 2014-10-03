<div class="grid-list-title">{{job.jobName}}</div>
<ul class="grid-list">
	{{#if_eq job.candidates.length 0}}
		<li>
			<div class="column empty-list">No candidates for {{job.jobName}} job</div>
		</li>
	{{/if_eq}}
</ul>